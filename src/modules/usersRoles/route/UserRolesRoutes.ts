import express, { Request, Response,NextFunction } from 'express'
import { UserRoutesController } from '../controllers/UserRolesController';
import { validateAttributeMiddleware } from '@middlewares/validateAttributeMiddleware';

export const UserRoutesRoutes = (userRoutesController: UserRoutesController): express.Router => {
    const router = express.Router();

    router.get('/:id',
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => userRoutesController.getUserRoutesById(req, res, next)    
    )

    router.get('/', (req: Request, res: Response, next: NextFunction) => userRoutesController.getAllUserRoutess(req, res, next));

    router.post('/',
        validateAttributeMiddleware('body', 'action', 'Action missing or invalid in request body'),
        validateAttributeMiddleware('body', 'resource', 'Resource missing or invalid in request body'),
        validateAttributeMiddleware('body', 'description', 'Description missing or invalid in request body'),
        (req: Request, res: Response, next: NextFunction) => userRoutesController.createUserRoutes(req, res, next)
    );

    router.patch('/:id',
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => userRoutesController.modifyUserRoutes(req, res, next)
    );

    router.delete('/:id',
        validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
        (req: Request, res: Response, next: NextFunction) => userRoutesController.deleteUserRoutes(req, res, next)
    );

    return router;
}