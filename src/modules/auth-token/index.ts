import express from 'express';
import { AuthTokenController } from './controllers/AuthTokenController';
import { AuthTokenService } from './services/AuthTokenService';
import { AuthTokenRoutes } from './route/AuthTokenRoutes';
import { UserRepositoryMySQL } from '@modules/users/repositories/drivers/UserRepositoryMySQL';
import { getDatabase } from '@db/DatabaseClient';
import { UserRolesRepositoryMySQL } from '@modules/user-roles/repositories/drivers/UserRolesRepositoryMySQL';
import { getRepository } from '@core/db/databaseGuards';
import { AuthTokenRepositoryMySQL } from './repositories/drivers/AuthTokenRepositoryMySQL';
import { AuthTokenRepositoryRedis } from './repositories/drivers/AuthTokenRepositoryRedis';
import { IAuthTokenRepository } from './repositories/contract/IAuthTokenRepository';
import { UserRepositoryRedis } from '@modules/users/repositories/drivers/UserRepositoryRedis';
import { IUserRepository } from '@modules/users/repositories/contract/IUserRepository';
import { UserRolesRepositoryRedis } from '@modules/user-roles/repositories/drivers/UserRolesRepositoryRedis';
import { IUserRolesRepository } from '@modules/user-roles/repositories/contract/IUserRolesRepository';

export const createAuthTokenModule = async (): Promise<express.Router> => {
  const myDB = await getDatabase();

  const authTokenRepository = getRepository(myDB, AuthTokenRepositoryMySQL, AuthTokenRepositoryRedis) as IAuthTokenRepository;
  const userRepository = getRepository(myDB, UserRepositoryMySQL, UserRepositoryRedis) as IUserRepository;
  const userRolesRepository = getRepository(myDB, UserRolesRepositoryMySQL, UserRolesRepositoryRedis) as IUserRolesRepository;

  const authTokenService = new AuthTokenService(authTokenRepository, userRepository, userRolesRepository);
  const authTokenController = new AuthTokenController(authTokenService);

  return AuthTokenRoutes(authTokenController);
};
