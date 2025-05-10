import express from 'express';
import { UserController } from './controllers/UserController';
import { UserService } from './services/ContentBlockService';
import { UserRepositorySQL } from './repositories/drivers/ContentBlockRepositorySQL';
import { userRoutes } from './route/contentBlockRoutes';
import { getDatabase } from '@db/DatabaseClient';
import { IUserRepository } from './repositories/contract/IContentBlockRepository';
import { getRepository } from '@core/db/databaseGuards';
import { UserRepositoryRedis } from './repositories/drivers/ContentBlockRepositoryRedis';
import { UserRepositoryMongo } from './repositories/drivers/ContentBlockRepositoryMongo';

export const createUserModule = async (): Promise<express.Router> => {

  const myDB = await getDatabase();

  const userRepository = getRepository(myDB, UserRepositorySQL, UserRepositoryRedis, UserRepositoryMongo) as IUserRepository;

  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  return userRoutes(userController);
};
