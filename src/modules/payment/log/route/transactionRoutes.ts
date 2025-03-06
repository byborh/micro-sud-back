import express, { Request, Response,NextFunction } from 'express'
import { TransactionController } from '../controllers/TransactionController';
import { validateAttributeMiddleware } from '@middlewares/validateAttributeMiddleware';
import { authMiddleware } from '@middlewares/authMiddleware';

export const transactionRoutes = (roleController: TransactionController): express.Router => {
    const router = express.Router();

    router.get('/:id',
        // authMiddleware(['ADMIN', 'MANAGER']),
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => roleController.getTransactionById(req, res, next)    
    )

    router.get('/',
        // authMiddleware(['ADMIN', 'MANAGER']),
        (req: Request, res: Response, next: NextFunction) => roleController.getTransactions(req, res, next)
    );

    router.post('/',
        // authMiddleware(['ADMIN']),
        validateAttributeMiddleware('body', 'name', 'Action missing or invalid in request body'),
        validateAttributeMiddleware('body', 'description', 'Description missing or invalid in request body'),
        (req: Request, res: Response, next: NextFunction) => roleController.createTransaction(req, res, next)
    );

    router.post('/:id',
        // authMiddleware(['ADMIN']),
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => roleController.cancelTransactionById(req, res, next)
    );

    return router;
}