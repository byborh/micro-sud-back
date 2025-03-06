import express from 'express';
import { InvoiceService } from './services/InvoiceService';
import { getDatabase } from '@db/DatabaseClient';
import { getRepository } from '@core/db/databaseGuards';
import { IInvoiceRepository } from './repositories/contract/IInvoiceRepository';
import { InvoiceRepositorySQL } from './repositories/drivers/InvoiceRepositorySQL';
import { InvoiceRepositoryRedis } from './repositories/drivers/InvoiceRepostoryRedis';
import { InvoiceController } from './controllers/InvoiceController';
import { invoiceRoutes } from './route/invoiceRoutes';

export const createInvoiceModule = async (): Promise<express.Router> => {
  const myDB = await getDatabase();

  const invoiceRepository = getRepository(myDB, InvoiceRepositorySQL, InvoiceRepositoryRedis, InvoiceRepositorySQL) as IInvoiceRepository;
  
  const invoiceService = new InvoiceService(invoiceRepository);
  const invoiceController = new InvoiceController(invoiceService);

  return invoiceRoutes(invoiceController);
};
