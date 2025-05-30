import express, { Request, Response, NextFunction } from 'express';
import { ContentBlockController } from '../controllers/ContentBlockController';
import { validateAttributeMiddleware } from '@middlewares/validateAttributeMiddleware';
import { validateContentBlockByTypeMiddleware } from '@middlewares/validateContentBlocksType';
import { upload } from '@middlewares/MulterImgMiddleware';

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
    // validateAttributeMiddleware('body', 'type', 'Type missing or invalid in request body.'),
    upload.single('img'),
    validateContentBlockByTypeMiddleware,
    (req: Request, res: Response, next: NextFunction) => contentBlockController.createContentBlock(req, res, next)
  );

  router.patch(
    '/:id',
    upload.single('img'),
    validateAttributeMiddleware('params', 'id', 'Id missing or invalid in request params.'),
    validateContentBlockByTypeMiddleware,
    (req, res, next) => contentBlockController.modifyContentBlock(req, res, next)
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