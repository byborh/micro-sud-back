// src/modules/users/routes/userRoutes.ts
import express, { Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { validateAttributeMiddleware } from '@middlewares/validateAttributeMiddleware';

export const userRoutes = (userController: UserController): express.Router => {
  const router = express.Router();

  router.get('/:id', 
    validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
    (req: Request, res: Response) => userController.getUserById(req, res)
  );

  router.get('/', (req: Request, res: Response) => userController.getAllUsers(req, res));

  router.post('/',
    validateAttributeMiddleware('body', 'email', 'Email missing or invalid in request body'),
    validateAttributeMiddleware('body', 'password', 'Password missing or invalid in request body'),
    (req: Request, res: Response) => userController.createUser(req, res)
  );

  router.patch('/:id',
    validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
    (req: Request, res: Response) => userController.modifyUser(req, res)
  );

  router.delete('/:id',
    validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
    (req: Request, res: Response) => userController.deleteUser(req, res)
  );

  return router;
};
