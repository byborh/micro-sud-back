// src/modules/users/index.ts
import express from 'express';
import { UserController } from './controller/UserController';
import { UserService } from './service/UserService';
import { UserRepository } from './repository/UserRepository';
import { userRoutes } from './route/userRoutes';

export const createUserModule = (): express.Router => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  // Le contrôleur sera injecté dans les routes
  return userRoutes(userController);
};
