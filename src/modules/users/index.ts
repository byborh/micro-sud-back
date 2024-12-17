// src/modules/users/index.ts
import express from 'express';
import { UserController } from './controllers/UserController';
import { UserService } from './services/UserService';
import { UserRepository } from './repositories/drivers/UserRepository';
import { userRoutes } from './route/userRoutes';

export const createUserModule = (): express.Router => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  // Le contrôleur sera injecté dans les routes
  return userRoutes(userController);
};
