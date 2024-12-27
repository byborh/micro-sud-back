// src/modules/users/index.ts
import express from 'express';
import { UserController } from './controllers/UserController';
import { UserService } from './services/UserService';
import { UserRepositoryMySQL } from './repositories/drivers/UserRepositoryMySQL';
import { userRoutes } from './route/userRoutes';
import { MySQLDatabase } from '@db/drivers/MySQLDatabase';

export const createUserModule = (): express.Router => {
  const mySQLDatabase = new MySQLDatabase;
  const userRepositoryMySQL = new UserRepositoryMySQL(mySQLDatabase);
  const userService = new UserService(userRepositoryMySQL);
  const userController = new UserController(userService);

  // Le contrôleur sera injecté dans les routes
  return userRoutes(userController);
};
