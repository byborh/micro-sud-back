import express, { Request, Response,NextFunction } from 'express'
import { PermissionController } from '../controllers/PermissionController';
import { validateAttributeMiddleware } from '@middlewares/validateAttributeMiddleware';

export const permissionRoutes = (permissionController: PermissionController): express.Router => {
    const router = express.Router();

    router.get('/:id',
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => permissionController.getPermissionById(req, res, next)    
    )

    router.get('/', (req: Request, res: Response, next: NextFunction) => permissionController.getAllPermissions(req, res, next));

    router.post('/',
        validateAttributeMiddleware('body', 'action', 'Action missing or invalid in request body'),
        validateAttributeMiddleware('body', 'resource', 'Resource missing or invalid in request body'),
        validateAttributeMiddleware('body', 'description', 'Description missing or invalid in request body'),
        (req: Request, res: Response, next: NextFunction) => permissionController.createPermission(req, res, next)
    );

    router.patch('/:id',
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => permissionController.modifyPermission(req, res, next)
    );

    router.delete('/:id',
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => permissionController.deletePermission(req, res, next)
    );

    return router;
}