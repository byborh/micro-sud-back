import { TransactionAbstract } from "@modules/payment/modules/transaction/entity/Transaction.abstract";
import { UserAbstract } from "@modules/users/entity/User.abstract";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from 'fs';
import { InvoiceAbstract } from "@modules/payment/modules/invoice/entity/Invoice.abstract";

export async function generateInvoice(
    debtor: UserAbstract,
    beneficiary: UserAbstract,
    transaction: TransactionAbstract,
    invoice: InvoiceAbstract
): Promise<{ pdfBytes: Uint8Array, fileName: string }> {
    try {
        // Récupérer le logo de l'entreprise si existant !
        
        // Créer un document PDF
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 700]);
        const { width } = page.getSize();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        let y = 650; // Position de départ

        const drawText = (text: string, x: number, y: number) => {
            page.drawText(text, { x, y, size: 12, font });
        };

        // Titre
        page.drawText("INVOICE", { x: 250, y, size: 20, font });
        y -= 40;

        // Infos du débiteur
        drawText("Debtor:", 50, y);
        drawText(`${debtor.firstname || ''} ${debtor.lastname || ''}`, 150, y);
        drawText(`Email: ${debtor.email}`, 150, y - 15);
        drawText(`Phone: ${debtor.telnumber || 'N/A'}`, 150, y - 30);
        y -= 60;

        // Infos du bénéficiaire
        drawText("Beneficiary:", 50, y);
        drawText(`${beneficiary.firstname || ''} ${beneficiary.lastname || ''}`, 150, y);
        drawText(`Email: ${beneficiary.email}`, 150, y - 15);
        drawText(`Phone: ${beneficiary.telnumber || 'N/A'}`, 150, y - 30);
        y -= 60;

        // Détails de la transaction
        drawText("Transaction Details:", 50, y);
        drawText(`Amount: ${transaction.amount} ${transaction.currency}`, 150, y);
        drawText(`Provider: ${transaction.payment_provider}`, 150, y - 15);
        drawText(`Status: ${transaction.status}`, 150, y - 30);
        drawText(`Date: ${transaction.transaction_date.toISOString()}`, 150, y - 45);
        drawText(`Ref: ${transaction.transaction_ref || 'N/A'}`, 150, y - 60);
        y -= 80;

        // Métadonnées (si disponibles)
        if (transaction.metadata) {
            drawText("Metadata:", 50, y);
            let metaY = y - 20;
            for (const key in transaction.metadata) {
                const value = JSON.stringify(transaction.metadata[key]);
                drawText(`${key}: ${value}`, 100, metaY);
                metaY -= 15;
            }
            y = metaY - 20;
        }

        // Générer le PDF
        const pdfBytes = await pdfDoc.save();

        // Créer un nom de fichier explicite
        const fileName = `invoice_for_transaction.${transaction.id}.pdf`;


        fs.writeFileSync(fileName, pdfBytes);

        return { pdfBytes, fileName };
    } catch (error) {
        console.error("Error generating PDF:", error);
        throw new Error("Failed to generate PDF");
    }
}