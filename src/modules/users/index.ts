import express from 'express';
import { UserController } from './controllers/UserController';
import { UserService } from './services/UserService';
import { UserRepositorySQL } from './repositories/drivers/UserRepositorySQL';
import { UserRoutes } from './route/UserRoutes';
import { getDatabase } from '@db/DatabaseClient';
import { IUserRepository } from './repositories/contract/IUserRepository';
import { getRepository } from '@core/db/databaseGuards';
import { UserRepositoryRedis } from './repositories/drivers/UserRepositoryRedis';

export const createUserModule = async (): Promise<express.Router> => {

  console.log("ALL IS OK FOR THE MOMENT ! user index.ts");

  const myDB = await getDatabase();

  console.log("ALL IS OK FOR THE MOMENT ! user index.ts");

  const userRepository = getRepository(myDB, UserRepositorySQL, UserRepositoryRedis) as IUserRepository;

  console.log("ALL IS OK FOR THE MOMENT ! user index.ts");

  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  console.log("ALL IS OK FOR THE MOMENT ! user index.ts");

  return UserRoutes(userController);
};
