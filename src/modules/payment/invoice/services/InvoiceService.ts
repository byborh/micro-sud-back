import { InvoiceAbstract } from "../entity/Invoice.abstract";
import { IInvoiceRepository } from "../repositories/contract/IInvoiceRepository";

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
    public async createInvoice(invoice: InvoiceAbstract): Promise<InvoiceAbstract | null> {
        try {
            return await this.invoiceRepository.createInvoice(invoice);
        } catch (error) {
            console.error("Error creating invoice in InvoiceService:", error);
            throw new Error("Failed to create invoice.");
        }
    }
}
