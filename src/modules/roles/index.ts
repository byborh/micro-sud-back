import express from 'express';
import { RoleController } from './controllers/RoleController';
import { RoleService } from './services/RoleService';
import { roleRoutes } from './route/RoleRoutes';
import { RoleRepositoryMySQL } from './repositories/drivers/RoleRepositoryMySQL';
import { getDatabase } from '@db/DatabaseClient';
import { RoleRepositoryRedis } from './repositories/drivers/RoleRepostoryRedis';
import { getRepository } from '@core/db/databaseGuards';
import { IRoleRepository } from './repositories/contract/IRoleRepository';

export const createRoleModule = async (): Promise<express.Router> => {
  const myDB = await getDatabase();

  const roleRepository = getRepository(myDB, RoleRepositoryMySQL, RoleRepositoryRedis) as IRoleRepository;
  
  const roleService = new RoleService(roleRepository);
  const roleController = new RoleController(roleService);

  return roleRoutes(roleController);
};
