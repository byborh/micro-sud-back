import express from 'express';
import { ChatAIController } from './controllers/ChatAIController';
import { ChatAIService } from './services/ChatAIService';
import { ChatAIRepositoryMySQL } from './repositories/drivers/ChatAIRepositoryMySQL';
import { ChatAIRoutes } from './route/ChatAIRoutes';

export const createChatAIModule = (): express.Router => {
  const chatAIRepositoryMySQL = new ChatAIRepositoryMySQL();
  const chatAIService = new ChatAIService(chatAIRepositoryMySQL);
  const chatAIController = new ChatAIController(chatAIService);

  // Le contrôleur sera injecté dans les routes
  return ChatAIRoutes(chatAIController);
};
