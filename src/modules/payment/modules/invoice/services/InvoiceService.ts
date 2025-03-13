import { getDatabase } from "@db/DatabaseClient";
import { InvoiceAbstract } from "../entity/Invoice.abstract";
import { IInvoiceRepository } from "../repositories/contract/IInvoiceRepository";
import { getRepository } from "@core/db/databaseGuards";
import { TransactionRepositorySQL } from "../../transaction/repositories/drivers/TransactionRepositorySQL";
import { TransactionRepositoryRedis } from "../../transaction/repositories/drivers/TransactionRepostoryRedis";
import { TransactionRepositoryMongo } from "../../transaction/repositories/drivers/TransactionRepositoryMongo";
import { ITransactionRepository } from "../../transaction/repositories/contract/ITransactionRepository";
import { UserRepositorySQL } from "@modules/users/repositories/drivers/UserRepositorySQL";
import { UserRepositoryRedis } from "@modules/users/repositories/drivers/UserRepositoryRedis";
import { UserRepositoryMongo } from "@modules/users/repositories/drivers/UserRepositoryMongo";
import { IUserRepository } from "@modules/users/repositories/contract/IUserRepository";
import { TransactionAbstract } from "../../transaction/entity/Transaction.abstract";
import { UserAbstract } from "@modules/users/entity/User.abstract";
import { generateInvoice } from "@modules/payment/cores/pdf/generateInvoice";

export class InvoiceService {
    private invoiceRepository: IInvoiceRepository;

    constructor(invoiceRepository: IInvoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    // Get Invoice By Id
    public async getInvoiceById(invoiceId: string): Promise<InvoiceAbstract | null> {
        try {
            return await this.invoiceRepository.getInvoiceById(invoiceId);
        } catch (error) {
            console.error("Error finding invoice in InvoiceService:", error);
            throw new Error("Failed to find invoice.");
        }
    }

    // Get Invoice By User Id
    public async getInvoiceByUserId(userId: string): Promise<InvoiceAbstract | null> {
        try {
            return await this.invoiceRepository.getInvoiceById(userId);
        } catch (error) {
            console.error("Error finding invoice in InvoiceService:", error);
            throw new Error("Failed to find invoice.");
        }
    }


    // Get All Invoices
    public async getInvoices(): Promise<InvoiceAbstract[] | null> {
        try {
            return await this.invoiceRepository.getInvoices();
        } catch (error) {
            console.error("Error finding all invoices in InvoiceService:", error);
            throw new Error("Failed to find all invoices.");
        }
    }


    // Create Invoice
    public async createInvoice(invoice: InvoiceAbstract): Promise<any | null> { // Corriger le type plus tard !
        try {
            // Récupérer la transaction !
            const myDB = await getDatabase();
            const transactionRepository = await getRepository(myDB, TransactionRepositorySQL, TransactionRepositoryRedis, TransactionRepositoryMongo) as ITransactionRepository;

            const transaction: TransactionAbstract = await transactionRepository.getTransactionById(invoice.transaction_id);
            if(!transaction) throw new Error("Transaction not found");
            

            // Récupérer les 2 users ! debiteur et le bénéfcieur
            const userRepository = await getRepository(myDB, UserRepositorySQL, UserRepositoryRedis, UserRepositoryMongo) as IUserRepository;
            const debtor: UserAbstract = await userRepository.findUserByEmail(transaction.debtor_email);
            const beneficiary: UserAbstract = await userRepository.findUserByEmail(transaction.beneficiary_email);
            if(!debtor) throw new Error("Debtor not found");
            if(!beneficiary) throw new Error("Beneficiary not found");

            // Créer et le renvoyer un pdf
            const { pdfBytes, fileName } = await generateInvoice(debtor, beneficiary, transaction);

            console.log("Voici le nom du fichier génréré : ", fileName);

            return {pdfBytes, fileName};


            // Mettre une condition :
            /*
                Si, STORAGE_PROVIDER est none, alors, renvoyer le pdf sans l'enregistrer

                Sinon envoyer vers les méthodes d'enregistrement dans un serveur. du genre :
                    Si, STORAGE_PROVIDER est local, alors, enregsitrer en local dans datte le pdf : /var/datte-storage

                    Si STORAGE_PROVIDER est s3(externe), alors, récupérer aussi la clé d'API de s3 et stocker les pdf dessus

                    Si STORAGE_PROVIDER est docker, alors créer une image docker et stocker les pdf dessus
            */
            // return await this.invoiceRepository.createInvoice(invoice);
        } catch (error) {
            console.error("Error creating invoice in InvoiceService:", error);
            throw new Error("Failed to create invoice.");
        }
    }
}
