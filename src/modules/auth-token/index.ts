import express from 'express';
import { AuthTokenController } from './controllers/AuthTokenController';
import { AuthTokenService } from './services/AuthTokenService';
import { AuthTokenRepositoryMySQL } from './repositories/drivers/AuthTokenRepositoryMySQL';
import { AuthTokenRoutes } from './route/AuthTokenRoutes';
import { UserRepositoryMySQL } from '@modules/users/repositories/drivers/UserRepositoryMySQL';

export const createAuthTokenModule = (): express.Router => {
  const authTokenRepositoryMySQL = new AuthTokenRepositoryMySQL();

  // User repository in AuthToken module
  const userRepositoryMySQL = new UserRepositoryMySQL();

  const authTokenService = new AuthTokenService(authTokenRepositoryMySQL, userRepositoryMySQL);
  const authTokenController = new AuthTokenController(authTokenService);

  // Le contrôleur sera injecté dans les routes
  return AuthTokenRoutes(authTokenController);
};
