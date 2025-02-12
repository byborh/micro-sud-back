import express from 'express';
import { UserController } from './controllers/UserController';
import { UserService } from './services/UserService';
import { UserRepositoryMySQL } from './repositories/drivers/UserRepositoryMySQL';
import { UserRoutes } from './route/userRoutes';
import { getDatabase } from '@db/DatabaseClient';

export const createUserModule = async (): Promise<express.Router> => {
  const myDB = await getDatabase();

  const userRepositoryMySQL = new UserRepositoryMySQL(myDB);
  const userService = new UserService(userRepositoryMySQL);
  const userController = new UserController(userService);

  return UserRoutes(userController);
};
