import express from 'express';
import { RefundService } from './services/RefundService';
import { getDatabase } from '@db/DatabaseClient';
import { getRepository } from '@core/db/databaseGuards';
import { IRefundRepository } from './repositories/contract/IRefundRepository';
import { RefundRepositorySQL } from './repositories/drivers/RefundRepositorySQL';
import { RefundRepositoryRedis } from './repositories/drivers/RefundRepostoryRedis';
import { RefundController } from './controllers/RefundController';
import { refundRoutes } from './route/refundRoutes';

export const createRefundModule = async (): Promise<express.Router> => {
  const myDB = await getDatabase();

  const refundRepository = getRepository(myDB, RefundRepositorySQL, RefundRepositoryRedis, RefundRepositorySQL) as IRefundRepository;
  
  const refundService = new RefundService(refundRepository);
  const refundController = new RefundController(refundService);

  return refundRoutes(refundController);
};
