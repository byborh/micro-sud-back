import express, { Request, Response,NextFunction } from 'express'
import { TransactionController } from '../controllers/TransactionController';
import { validateAttributeMiddleware } from '@middlewares/validateAttributeMiddleware';
import { authMiddleware } from '@middlewares/authMiddleware';

export const transactionRoutes = (transactionController: TransactionController): express.Router => {
    const router = express.Router();

    router.post('/create-payment-account', 
        // authMiddleware(['USER', 'MANAGER', 'ADMIN']),
        validateAttributeMiddleware('body', 'email', 'Email missing or invalid in request body'),
        validateAttributeMiddleware('body', 'name', 'Name missing or invalid in request body'),
        validateAttributeMiddleware('body', 'payment_provider', 'Payment Method missing or invalid in request body'),
        (req: Request, res: Response, next: NextFunction) => transactionController.createPaymentAccount(req, res, next)
    );

    router.get('/:id',
        // authMiddleware(['ADMIN', 'MANAGER']),
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => transactionController.getTransactionById(req, res, next)    
    )

    router.get('/',
        // authMiddleware(['ADMIN', 'MANAGER']),
        (req: Request, res: Response, next: NextFunction) => transactionController.getTransactions(req, res, next)
    );

    router.post('/',
        // authMiddleware(['ADMIN']),
        validateAttributeMiddleware('body', 'amount', 'Amount missing or invalid in request body'),
        validateAttributeMiddleware('body', 'currency', 'Currency missing or invalid in request body'),
        validateAttributeMiddleware('body', 'payment_provider', 'Payment Method missing or invalid in request body'),
        validateAttributeMiddleware('body', 'debtor_email', 'Email of debitor missing or invalid in request body'),
        validateAttributeMiddleware('body', 'beneficiary_email', 'Email of beneficiary missing or invalid in request body'),
        validateAttributeMiddleware('body', 'payment_identifier', 'Payment Method of the transaction missing or invalid in request body'),
        validateAttributeMiddleware('body', 'description', 'Description missing or invalid in request body'),
        (req: Request, res: Response, next: NextFunction) => transactionController.createTransaction(req, res, next)
    );

    router.post('/:id',
        // authMiddleware(['ADMIN']),
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => transactionController.cancelTransactionById(req, res, next)
    );

    return router;
}