import express from 'express';
import { AuthTokenController } from './controllers/AuthTokenController';
import { AuthTokenService } from './services/AuthTokenService';
import { AuthTokenRepositoryMySQL } from './repositories/drivers/AuthTokenRepositoryMySQL';
import { AuthTokenRoutes } from './route/AuthTokenRoutes';
import { UserRepositoryMySQL } from '@modules/users/repositories/drivers/UserRepositoryMySQL';
import { UserRolesRepositoryMySQL } from '@modules/user-roles/repositories/drivers/UserRolesRepositoryMySQL';
import { getDatabase } from '@db/DatabaseClient';

export const createAuthTokenModule = async (): Promise<express.Router> => {
  const myDB = await getDatabase();

  const authTokenRepositoryMySQL = new AuthTokenRepositoryMySQL(myDB);

  // User / User-Role repositories in AuthToken module
  const userRepositoryMySQL = new UserRepositoryMySQL(myDB);
  const userRolesRepositoryMySQL = new UserRolesRepositoryMySQL(myDB);

  const authTokenService = new AuthTokenService(authTokenRepositoryMySQL, userRepositoryMySQL, userRolesRepositoryMySQL);
  const authTokenController = new AuthTokenController(authTokenService);

  // Le contrôleur sera injecté dans les routes
  return AuthTokenRoutes(authTokenController);
};
