import express, { Request, Response,NextFunction } from 'express'
import { RefundController } from '../controllers/RefundController';
import { validateAttributeMiddleware } from '@middlewares/validateAttributeMiddleware';
import { authMiddleware } from '@middlewares/authMiddleware';

export const refundRoutes = (roleController: RefundController): express.Router => {
    const router = express.Router();

    router.get('/:id',
        // authMiddleware(['ADMIN', 'MANAGER']),
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => roleController.getRefundById(req, res, next)    
    )

    router.get('/',
        // authMiddleware(['ADMIN', 'MANAGER']),
        (req: Request, res: Response, next: NextFunction) => roleController.getRefunds(req, res, next)
    );

    router.post('/',
        // authMiddleware(['ADMIN']),
        validateAttributeMiddleware('body', 'transaction_id', 'Transaction id missing or invalid in request body'),
        (req: Request, res: Response, next: NextFunction) => roleController.createRefund(req, res, next)
    );

    return router;
}