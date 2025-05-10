import { getRepository } from '@core/db/databaseGuards';
import { getDatabase } from '@db/DatabaseClient';
import express from 'express';
import { ContentBlockController } from './controllers/ContentBlockController';
import { IContentBlockRepository } from './repositories/contract/IContentBlockRepository';
import { ContentBlockRepositoryMongo } from './repositories/drivers/ContentBlockRepositoryMongo';
import { ContentBlockRepositoryRedis } from './repositories/drivers/ContentBlockRepositoryRedis';
import { ContentBlockRepositorySQL } from './repositories/drivers/ContentBlockRepositorySQL';
import { userRoutes } from './route/contentBlockRoutes';
import { ContentBlockService } from './services/ContentBlockService';


export const createContentBlockModule = async (): Promise<express.Router> => {

  const myDB = await getDatabase();

  const userRepository = getRepository(myDB, ContentBlockRepositorySQL, ContentBlockRepositoryRedis, ContentBlockRepositoryMongo) as IContentBlockRepository;

  const userService = new ContentBlockService(userRepository);
  const userController = new ContentBlockController(userService);

  return userRoutes(userController);
};
