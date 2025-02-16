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

export const createAuthTokenModule = async (): Promise<express.Router> => {
  const myDB = await getDatabase();

  const authTokenRepository = getRepository(myDB, AuthTokenRepositoryMySQL, AuthTokenRepositoryRedis) as IAuthTokenRepository;

  // User / User-AuthToken repositories in AuthToken module
  const userRepositoryMySQL = new UserRepositoryMySQL(myDB);
  const userRolesRepositoryMySQL = new UserRolesRepositoryMySQL(myDB); // à changer à une interface

  const authTokenService = new AuthTokenService(authTokenRepository, userRepositoryMySQL, userRolesRepositoryMySQL);
  const authTokenController = new AuthTokenController(authTokenService);

  // Le contrôleur sera injecté dans les routes
  return AuthTokenRoutes(authTokenController);
};
