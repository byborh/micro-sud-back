import express from 'express';
import { TransactionService } from './services/TransactionService';
import { getDatabase } from '@db/DatabaseClient';
import { getRepository } from '@core/db/databaseGuards';
import { ITransactionRepository } from './repositories/contract/ITransactionRepository';
import { TransactionRepositorySQL } from './repositories/drivers/TransactionRepositorySQL';
import { TransactionRepositoryRedis } from './repositories/drivers/TransactionRepostoryRedis';
import { TransactionController } from './controllers/TransactionController';
import { transactionRoutes } from './route/transactionRoutes';

export const createTransactionModule = async (): Promise<express.Router> => {
  const myDB = await getDatabase();

  const transactionRepository = getRepository(myDB, TransactionRepositorySQL, TransactionRepositoryRedis, TransactionRepositorySQL) as ITransactionRepository;
  
  const transactionService = new TransactionService(transactionRepository);
  const transactionController = new TransactionController(transactionService);

  return transactionRoutes(transactionController);
};
