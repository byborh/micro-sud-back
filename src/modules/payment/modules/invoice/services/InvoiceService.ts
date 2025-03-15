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
import { storeInvoice } from "@modules/payment/cores/pdf/storeInvoice";
import { TStore } from "@core/store/TStore";
import { getInvoice } from "@modules/payment/cores/pdf/getInvoice";

export class InvoiceService {
    private invoiceRepository: IInvoiceRepository;

    constructor(invoiceRepository: IInvoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    // Get Invoice By Id
    public async getInvoiceByTransactionId(transactionId: string): Promise<{ pdfBytes: Uint8Array, fileName: string } | null> {
        try {
            // Verfiy type of storage provider
            const storeProvider = process.env.STORAGE_PROVIDER as TStore;
            if(storeProvider === "none") {
                console.error("Storage provider is not set, so Invoice didn't stored.");
                throw new Error("Storage provider is not set, so Invoice didn't stored.");
            }
            
            // Get invoice
            const invoice = await this.invoiceRepository.getInvoiceByTransactionId(transactionId);
            if(!invoice) throw new Error("Invoice not found");

            console.log("Voici l'invoice trouvée dans la base de donéne: ", invoice);

            const { pdfBytes, fileName } = await getInvoice(invoice.pdf_link, storeProvider);


            return { pdfBytes, fileName };
        } catch (error) {
            console.error("Error finding invoice in InvoiceService:", error);
            throw new Error("Failed to find invoice.");
        }
    }


    // Create Invoice
    public async createInvoice(invoice: InvoiceAbstract): Promise<{ pdfBytes: Uint8Array, fileName: string } | null> { // Corriger le type plus tard !
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
            const { pdfBytes, fileName, filePath } = await storeInvoice(debtor, beneficiary, transaction, invoice);

            console.log("Voici le nom du fichier génréré : ", fileName);

            // Verify if filePath is null -> return pdfBytes and fileName without saving in database
            if(filePath) {
                invoice.pdf_link = filePath;

                // Save invoice in database
                const createdInvoice = await this.invoiceRepository.createInvoice(invoice);
                if(!createdInvoice) throw new Error("Invoice not created at data base.");
            };

            return {pdfBytes, fileName};
        } catch (error) {
            console.error("Error creating invoice in InvoiceService:", error);
            throw new Error("Failed to create invoice.");
        }
    }
}
