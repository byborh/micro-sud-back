import express, { Request, Response,NextFunction } from 'express'
import { LogController } from '../controllers/LogController';
import { validateAttributeMiddleware } from '@middlewares/validateAttributeMiddleware';
import { authMiddleware } from '@middlewares/authMiddleware';

export const logRoutes = (roleController: LogController): express.Router => {
    const router = express.Router();

    router.get('/:userId/',
        // authMiddleware(['ADMIN', 'MANAGER']),
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => roleController.getLogByUserId(req, res, next)    
    )

    router.get('/:transactionId/',
        // authMiddleware(['ADMIN', 'MANAGER']),
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => roleController.getLogByUserId(req, res, next)    
    )

    router.get('/',
        // authMiddleware(['ADMIN', 'MANAGER']),
        (req: Request, res: Response, next: NextFunction) => roleController.getLogs(req, res, next)
    );

    return router;
}