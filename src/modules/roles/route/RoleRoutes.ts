import express, { Request, Response,NextFunction } from 'express'
import { RoleController } from '../controllers/RoleController';
import { validateAttributeMiddleware } from '@middlewares/validateAttributeMiddleware';

export const roleRoutes = (roleController: RoleController): express.Router => {
    const router = express.Router();

    router.get('/:id',
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => roleController.getRoleById(req, res, next)    
    )

    router.get('/', (req: Request, res: Response, next: NextFunction) => roleController.getAllRoles(req, res, next));

    router.post('/',
        validateAttributeMiddleware('body', 'name', 'Action missing or invalid in request body'),
        validateAttributeMiddleware('body', 'description', 'Description missing or invalid in request body'),
        (req: Request, res: Response, next: NextFunction) => roleController.createRole(req, res, next)
    );

    router.patch('/:id',
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => roleController.modifyRole(req, res, next)
    );

    router.delete('/:id',
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => roleController.deleteRole(req, res, next)
    );

    return router;
}