import express, { Request, Response, NextFunction } from 'express';
import { ContentBlockController } from '../controllers/ContentBlockController';
import { validateAttributeMiddleware } from '@middlewares/validateAttributeMiddleware';
import { lengthRequirementMiddleware } from '@middlewares/lengthRequirementMiddleware';

export const userRoutes = (userController: ContentBlockController): express.Router => {
  const router = express.Router();

  router.get('/:id', 
    // authMiddleware(['ADMIN', 'USER']),
    validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
    (req: Request, res: Response, next: NextFunction) => userController.getContentBlockById(req, res, next)
  );

  router.get('/',
    // authMiddleware(['ADMIN'),
    (req: Request, res: Response, next: NextFunction) => userController.getAllContentBlocks(req, res, next)
  );

  router.post('/',
    validateAttributeMiddleware('body', 'email', 'Email missing or invalid in request body'),
    validateAttributeMiddleware('body', 'password', 'Password missing or invalid in request body'),
    lengthRequirementMiddleware(8, 'password'),
    lengthRequirementMiddleware(3, 'email'),
    (req: Request, res: Response, next: NextFunction) => userController.createContentBlock(req, res, next)
  );

  router.patch('/:id',
    // authMiddleware(['ADMIN', 'USER']),
    validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
    (req: Request, res: Response, next: NextFunction) => userController.modifyContentBlock(req, res, next)
  );

  router.delete('/:id',
    // authMiddleware(['ADMIN', 'USER']),
    validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
    (req: Request, res: Response, next: NextFunction) => userController.deleteContentBlock(req, res, next)
  );

  return router;
};
