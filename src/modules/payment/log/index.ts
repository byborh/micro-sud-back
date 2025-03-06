import express from 'express';
import { LogService } from './services/LogService';
import { getDatabase } from '@db/DatabaseClient';
import { getRepository } from '@core/db/databaseGuards';
import { ILogRepository } from './repositories/contract/ILogRepository';
import { LogRepositorySQL } from './repositories/drivers/LogRepositorySQL';
import { LogRepositoryRedis } from './repositories/drivers/LogRepostoryRedis';
import { LogController } from './controllers/LogController';
import { logRoutes } from './route/logRoutes';

export const createLogModule = async (): Promise<express.Router> => {
  const myDB = await getDatabase();

  const logRepository = getRepository(myDB, LogRepositorySQL, LogRepositoryRedis, LogRepositorySQL) as ILogRepository;
  
  const logService = new LogService(logRepository);
  const logController = new LogController(logService);

  return logRoutes(logController);
};
