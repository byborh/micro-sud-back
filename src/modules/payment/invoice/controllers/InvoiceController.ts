import { Request, Response, NextFunction } from "express";
import { InvoiceService } from "../services/InvoiceService";

export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {}

    // Get a invoice by ID
    public async getInvoiceById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve invoice by ID using InvoiceService
            const invoice = await this.invoiceService.getInvoiceById(req.params.id);
            
            // If no invoice is found, return 404
            if (!invoice) {
                res.status(404).json({ error: "Invoice not found" });
                return;
            }

            // Return the invoice data
            res.status(200).json(invoice);
        } catch (error) {
            next(error);
        }
    }

    // Get an invoice by user ID
    public async getInvoiceByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve invoice by ID using InvoiceService
            const invoice = await this.invoiceService.getInvoiceByUserId(req.params.id);
            
            // If no invoice is found, return 404
            if (!invoice) {
                res.status(404).json({ error: "Invoice not found" });
                return;
            }

            // Return the invoice data
            res.status(200).json(invoice);
        } catch (error) {
            next(error);
        }
    }

    // Get all invoices
    public async getInvoices(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Retrieve all invoices using InvoiceService
            const invoices = await this.invoiceService.getInvoices();

            // If no invoices are found, return 404
            if (!invoices || invoices.length === 0) {
                res.status(404).json({ error: "No invoices found" });
                return;
            }

            // Return all invoices data
            res.status(200).json(invoices);
        } catch (error) {
            next(error);
        }
    }

    // Create a invoice
    public async createInvoice(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // const { name, description } = req.body;

            // Check if required fields are provided
            // if (!name || !description) {
                // res.status(400).json({ error: "Action and resource are required." });
                // return;
            // }

            // Create invoice using InvoiceService
            // const createdInvoice = await this.invoiceService.createInvoice(invoice);

            // If creation fails, return 400
            // if (!createdInvoice) {
                // res.status(400).json({ error: "Invoice could not be created." });
                // return;
            // }

            // Return the created invoice data
            // res.status(201).json(createdInvoice);
        } catch (error) {
            next(error);
        }
    }
}
