import { TStore } from "@core/store/TStore";
import fs from "fs/promises";
import { S3Service } from "@core/store/S3Service";

export async function getInvoice(pdfLink: string, storeProvider: TStore): Promise<{ pdfBytes: Uint8Array, fileName: string }> {
    try {
        if (storeProvider === "local") {
            console.log("🔍 Lecture du fichier:", pdfLink);

            // Vérifie si le fichier existe et si c'est bien un fichier
            const stat = await fs.stat(pdfLink);
            if (!stat.isFile()) {
                throw new Error(`Le chemin ${pdfLink} n'est pas un fichier valide.`);
            }

            // Lire le fichier directement depuis `pdfLink`
            const pdfBytes = await fs.readFile(pdfLink);
            const fileName = pdfLink.split("/").pop()!;

            return { pdfBytes, fileName };
        }

        if (storeProvider === "s3") {
            const pdfBytes = await new S3Service().downloadPdf(pdfLink);
            const fileName = pdfLink.split("/").pop()!;
            return { pdfBytes, fileName };
        }

        throw new Error("Storage provider is not set, so Invoice didn't store.");
    } catch (error) {
        console.error("❌ Erreur lors de la récupération de l'invoice :", error);
        throw new Error("Failed to find invoice.");
    }
}
