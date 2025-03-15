import { Request, Response, NextFunction } from "express";
import { InvoiceService } from "../services/InvoiceService";
import { IdGenerator } from "@core/idGenerator";
import { InvoiceAbstract } from "../entity/Invoice.abstract";

export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {}

    // Get a invoice by ID
    public async getInvoiceByTransactionId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const transactionId = req.params.transactionId;

            // Retrieve invoice by ID using InvoiceService
            const { pdfBytes, fileName } = await this.invoiceService.getInvoiceByTransactionId(transactionId);
            
            // If finding fails, return 400
            if (!pdfBytes) {
                res.status(400).json({ error: "Invoice could not be created." });
                return;
            }

            // Convert Uint8Array to Buffer
            const pdfBuffer = Buffer.from(pdfBytes);

            // Return the PDF as a response for download
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
            res.send(pdfBuffer);
        } catch (error) {
            next(error);
        }
    }

    // Create a invoice
    public async createInvoice(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { transaction_id } = req.body;

            if(transaction_id === "") res.status(401).json({error: "Transaction id is avoid !"})

            const invoice = {
                id: IdGenerator.getInstance().generateId(),
                transaction_id: transaction_id,
                createdAt: new Date(),
                pdf_link: null
            } as InvoiceAbstract;

            // Create invoice using InvoiceService
            const { pdfBytes, fileName }  = await this.invoiceService.createInvoice(invoice);

            // If creation fails, return 400
            if (!pdfBytes) {
                res.status(400).json({ error: "Invoice could not be created." });
                return;
            }

            // Convert Uint8Array to Buffer
            const pdfBuffer = Buffer.from(pdfBytes);

            // Return the PDF as a response for download
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
            res.send(pdfBuffer);
        } catch (error) {
            next(error);
        }
    }
}