// src/modules/users/routes/userRoutes.ts
import express, { Request, Response } from 'express';
import { UserController } from '../controller/UserController';
import { validateParamMiddleware } from '@middlewares/validateParamMiddleware';

export const userRoutes = (userController: UserController): express.Router => {
  const router = express.Router();

  router.get('/users/:id', 
    validateParamMiddleware('id', 'Invalid user ID'),
    (req: Request, res: Response) => userController.getUserById(req, res)
  );

  router.get('/users', (req: Request, res: Response) => userController.getAllUsers(req, res));

  router.post('/users',
    validateParamMiddleware('id', 'This user already exists.'),
    (req: Request, res: Response) => userController.createUser(req, res)
  );

  router.put('/users/:id',
    validateParamMiddleware('id', 'This user already exists.'),
    (req: Request, res: Response) => userController.modifyUser(req, res)
  );

  router.delete('/users/:id',
    validateParamMiddleware('id', 'This user already exists.'),
    (req: Request, res: Response) => userController.deleteUser(req, res)
  );

  return router;
};
