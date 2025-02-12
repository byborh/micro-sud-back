import express from 'express';
import { ChatAIController } from './controllers/ChatAIController';
import { ChatAIService } from './services/ChatAIService';
import { ChatAIRepositoryMySQL } from './repositories/drivers/ChatAIRepositoryMySQL';
import { ChatAIRoutes } from './route/ChatAIRoutes';
import { getDatabase } from '@db/DatabaseClient';

export const createChatAIModule = async (): Promise<express.Router> => {
  const myDB = await getDatabase();

  const chatAIRepositoryMySQL = new ChatAIRepositoryMySQL(myDB);
  const chatAIService = new ChatAIService(chatAIRepositoryMySQL);
  const chatAIController = new ChatAIController(chatAIService);

  // Le contrôleur sera injecté dans les routes
  return ChatAIRoutes(chatAIController);
};
