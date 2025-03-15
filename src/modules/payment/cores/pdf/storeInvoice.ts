import { TransactionAbstract } from "@modules/payment/modules/transaction/entity/Transaction.abstract";
import { UserAbstract } from "@modules/users/entity/User.abstract";
import { generateInvoice } from "./generateInvoice";
import { TStore } from "@core/store/TStore";
import { saveFileLocally } from "@core/store/saveFileLocally";
import { S3Service } from "@core/store/S3Service";
import { InvoiceAbstract } from "@modules/payment/modules/invoice/entity/Invoice.abstract";
// import dotenv from "dotenv";
// import dotenvExpand from "dotenv-expand";

// dotenvExpand.expand(dotenv.config());

export async function storeInvoice(
    debtor: UserAbstract,
    beneficiary: UserAbstract,
    transaction: TransactionAbstract,
    invoice: InvoiceAbstract
): Promise<{ pdfBytes: Uint8Array, fileName: string, filePath: string }> {
    // Generate the invoice
    const { pdfBytes, fileName } = await generateInvoice(debtor, beneficiary, transaction, invoice);

    // Verify the choise of user in .env file: STORE_PROVIDER=
    const storeProvider: TStore = process.env.STORAGE_PROVIDER as TStore;
    let filePath: string = null;

    try {
        if(storeProvider === "local") {
            // Define a folder path
            const folderPath = `${process.cwd()}/${process.env.LOCAL_STORAGE_PATH}/invoices`;
            
            // If STORAGE_PROVIDER is local, store the pdf in /var/datte-storage
            filePath = await saveFileLocally(pdfBytes, fileName, folderPath);
        } else if(storeProvider === "s3") {
            // If STORAGE_PROVIDER is s3, store the pdf in s3
            filePath = await new S3Service().uploadPdf(pdfBytes, fileName);
        }
        // If STORAGE_PROVIDER is none, return the pdf
    } catch(error) {
        console.log("Erreur lors de la sauvegarde du fichier.", error);
        throw new Error("Failed to generate invoice.");
    }
    
    return { pdfBytes: pdfBytes, fileName: fileName, filePath: filePath };
}