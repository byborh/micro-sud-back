// src/modules/users/index.ts
import express from 'express';
import { UserController } from './controllers/UserController';
import { UserService } from './services/UserService';
import { userRoutes } from './route/userRoutes';
import { UserRepositoryMySQL } from './repositories/drivers/UserRepositoryMySQL';

export const createUserModule = (): express.Router => {
  const userRepositoryMySQL = new UserRepositoryMySQL();
  const userService = new UserService(userRepositoryMySQL);
  const userController = new UserController(userService);

  // Le contrôleur sera injecté dans les routes
  return userRoutes(userController);
};
