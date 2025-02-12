import express from 'express';
import { RoleController } from './controllers/RoleController';
import { RoleService } from './services/RoleService';
import { roleRoutes } from './route/RoleRoutes';
import { RoleRepositoryMySQL } from './repositories/drivers/RoleRepositoryMySQL';
import { getDatabase } from '@db/DatabaseClient';

export const createRoleModule = async (): Promise<express.Router> => {
  const myDB = await getDatabase();
  
  const roleRepositoryMySQL = new RoleRepositoryMySQL(myDB);
  const roleService = new RoleService(roleRepositoryMySQL);
  const roleController = new RoleController(roleService);

  // Le contrôleur sera injecté dans les routes
  return roleRoutes(roleController);
};
