import express, { Request, Response,NextFunction } from 'express'
import { validateAttributeMiddleware } from '@middlewares/validateAttributeMiddleware';
import { RolePermissionsController } from '../controllers/RolePermissionsController';

export const RolePermissionsRoutes = (permissionRoutesController: RolePermissionsController): express.Router => {
    const router = express.Router();

    router.get('/:role_id/:permission_id',
        validateAttributeMiddleware('params', 'role_id', 'Role_id missing or invalid in request params.'),
        validateAttributeMiddleware('params', 'permission_id', 'Permission_id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => permissionRoutesController.getRolePermissionsById(req, res, next)    
    )

    router.get('/', (req: Request, res: Response, next: NextFunction) => permissionRoutesController.getAllRolePermissions(req, res, next));

    router.post('/',
        validateAttributeMiddleware('body', 'role_id', 'Role_id missing or invalid in request body'),
        validateAttributeMiddleware('body', 'permission_id', 'Permission_id missing or invalid in request body'),
        (req: Request, res: Response, next: NextFunction) => permissionRoutesController.createRolePermissions(req, res, next)
    );
    return router;
}