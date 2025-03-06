import express from 'express';
import { EscrowService } from './services/EscrowService';
import { getDatabase } from '@db/DatabaseClient';
import { getRepository } from '@core/db/databaseGuards';
import { IEscrowRepository } from './repositories/contract/IEscrowRepository';
import { EscrowRepositorySQL } from './repositories/drivers/EscrowRepositorySQL';
import { EscrowRepositoryRedis } from './repositories/drivers/EscrowRepostoryRedis';
import { EscrowController } from './controllers/EscrowController';
import { escrowRoutes } from './route/escrowRoutes';

export const createEscrowModule = async (): Promise<express.Router> => {
  const myDB = await getDatabase();

  const escrowRepository = getRepository(myDB, EscrowRepositorySQL, EscrowRepositoryRedis, EscrowRepositorySQL) as IEscrowRepository;
  
  const escrowService = new EscrowService(escrowRepository);
  const escrowController = new EscrowController(escrowService);

  return escrowRoutes(escrowController);
};
