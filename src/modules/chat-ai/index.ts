import express from 'express';
import { ChatAIController } from './controllers/ChatAIController';
import { ChatAIService } from './services/ChatAIService';
import { ChatAIRepositoryMySQL } from './repositories/drivers/ChatAIRepositoryMySQL';
import { ChatAIRoutes } from './route/ChatAIRoutes';
import { UserRepositoryMySQL } from '@modules/users/repositories/drivers/UserRepositoryMySQL';
import { UserRolesRepositoryMySQL } from '@modules/user-roles/repositories/drivers/UserRolesRepositoryMySQL';

export const createChatAIModule = (): express.Router => {
  const chatAIRepositoryMySQL = new ChatAIRepositoryMySQL();

  // User / User-Role repositories in ChatAI module
  const userRepositoryMySQL = new UserRepositoryMySQL();
  const userRolesRepositoryMySQL = new UserRolesRepositoryMySQL();

  const chatAIService = new ChatAIService(chatAIRepositoryMySQL, userRepositoryMySQL, userRolesRepositoryMySQL);
  const chatAIController = new ChatAIController(chatAIService);

  // Le contrôleur sera injecté dans les routes
  return ChatAIRoutes(chatAIController);
};
