import { TransactionAbstract } from "@modules/payment/modules/transaction/entity/Transaction.abstract";
import { UserAbstract } from "@modules/users/entity/User.abstract";
import { generateInvoice } from "./generateInvoice";
import { TStore } from "@core/store/TStore";
import { saveFileLocally } from "@core/store/saveFileLocally";
// import dotenv from "dotenv";
// import dotenvExpand from "dotenv-expand";

// dotenvExpand.expand(dotenv.config());

export async function storeInvoice(
    debtor: UserAbstract,
    beneficiary: UserAbstract,
    transaction: TransactionAbstract
): Promise<{ pdfBytes: Uint8Array, fileName: string }> {
    // Generate the invoice
    const { pdfBytes, fileName } = await generateInvoice(debtor, beneficiary, transaction);

    // Verify the choise of user in .env file: STORE_PROVIDER=
    const storeProvider: TStore = process.env.STORAGE_PROVIDER as TStore;

    // Define a folder path
    const folderPath = `${process.cwd()}/${process.env.LOCAL_STORAGE_PATH}/invoices`;

    if(storeProvider === "local") {
        // If STORAGE_PROVIDER is local, store the pdf in /var/datte-storage
        await saveFileLocally(pdfBytes, fileName, folderPath);
    } else if(storeProvider === "s3") {
        // If STORAGE_PROVIDER is s3, store the pdf in s3
    }

    // If STORAGE_PROVIDER is none, return the pdf
    return { pdfBytes: pdfBytes, fileName: fileName };
}