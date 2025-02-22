import express from 'express';
import { UserController } from './controllers/UserController';
import { UserService } from './services/UserService';
import { UserRepositoryMySQL } from './repositories/drivers/UserRepositorySQL';
import { UserRoutes } from './route/UserRoutes';
import { getDatabase } from '@db/DatabaseClient';
import { IUserRepository } from './repositories/contract/IUserRepository';
import { getRepository } from '@core/db/databaseGuards';
import { UserRepositoryRedis } from './repositories/drivers/UserRepositoryRedis';

export const createUserModule = async (): Promise<express.Router> => {
  const myDB = await getDatabase();

  const userRepository = getRepository(myDB, UserRepositoryMySQL, UserRepositoryRedis) as IUserRepository;

  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  return UserRoutes(userController);
};
