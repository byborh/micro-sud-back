import express, { Request, Response, NextFunction } from 'express';
import { ContentBlockController } from '../controllers/ContentBlockController';
import { validateAttributeMiddleware } from '@middlewares/validateAttributeMiddleware';
import { validateContentBlockByTypeMiddleware } from '@middlewares/validateContentBlocksType';

export const contentBlockRoutes = (contentBlockController: ContentBlockController): express.Router => {
  const router = express.Router();

  // Get by ID
  router.get(
    '/:id',
    validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
    (req: Request, res: Response, next: NextFunction) => contentBlockController.getContentBlockById(req, res, next)
  );

  // Get by Type
  router.get(
    '/type/:type',
    validateAttributeMiddleware('params', 'type', 'Type missing or invalid in request params.'),
    (req: Request, res: Response, next: NextFunction) => contentBlockController.getContentBlocksByType(req, res, next)
  );

  // Get all
  router.get(
    '/',
    (req: Request, res: Response, next: NextFunction) => contentBlockController.getAllContentBlocks(req, res, next)
  );

  // Create
  router.post(
    '/',
    // authMiddleware(['ADMIN']),
    validateAttributeMiddleware('body', 'type', 'Type missing or invalid in request body.'),
    validateContentBlockByTypeMiddleware,
    (req: Request, res: Response, next: NextFunction) => contentBlockController.createContentBlock(req, res, next)
  );

  // Update
  router.patch(
    '/:id',
    // authMiddleware(['ADMIN']),
    validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
    validateContentBlockByTypeMiddleware,
    // Optionnel : ajouter une middleware pour valider que body contient au moins une des propriétés autorisées
    (req: Request, res: Response, next: NextFunction) => contentBlockController.modifyContentBlock(req, res, next)
  );

  // Delete
  router.delete(
    '/:id',
    // authMiddleware(['ADMIN']),
    validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
    (req: Request, res: Response, next: NextFunction) => contentBlockController.deleteContentBlock(req, res, next)
  );

  return router;
};