import express, { Request, Response,NextFunction } from 'express'
import { InvoiceController } from '../controllers/InvoiceController';
import { validateAttributeMiddleware } from '@middlewares/validateAttributeMiddleware';
import { authMiddleware } from '@middlewares/authMiddleware';

export const invoiceRoutes = (roleController: InvoiceController): express.Router => {
    const router = express.Router();

    router.get('/:id',
        // authMiddleware(['ADMIN', 'MANAGER']),
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => roleController.getInvoiceById(req, res, next)    
    )

    router.get('/:userId',
        // authMiddleware(['ADMIN', 'MANAGER']),
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => roleController.getInvoiceById(req, res, next)    
    )

    router.get('/',
        // authMiddleware(['ADMIN', 'MANAGER']),
        (req: Request, res: Response, next: NextFunction) => roleController.getInvoices(req, res, next)
    );

    router.post('/',
        // authMiddleware(['ADMIN']),
        validateAttributeMiddleware('body', 'transaction_id', 'Action missing or invalid in request body'),
        (req: Request, res: Response, next: NextFunction) => roleController.createInvoice(req, res, next)
    );

    return router;
}