import express from 'express';
import { UserRolesService } from './services/UserRolesService';
import { UserRolesController } from './controllers/UserRolesController';
import { UserRolesRepositoryMySQL } from './repositories/drivers/UserRolesRepositoryMySQL';
import { UserRolesRoutes } from './route/UserRolesRoutes';
import { getDatabase } from '@db/DatabaseClient';


export const createUserRolesModule = async (): Promise<express.Router> => {
    const myDB = await getDatabase();

    const userRolesRepositoryMySQL = new UserRolesRepositoryMySQL(myDB);
    const userRolesService = new UserRolesService(userRolesRepositoryMySQL);
    const userRolesController = new UserRolesController(userRolesService);

    return UserRolesRoutes(userRolesController);
}