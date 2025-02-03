import express from 'express';
import { UserRolesRoutes } from './route/UserRolesRoutes';
import { UserRolesRepositoryMySQL } from './repositories/drivers/UserRolesRepositoryMySQL';


export const createUserRolesModule = (): express.Router => {
    const userRolesRepositoryMySQL = new UserRolesRepositoryMySQL();
    const userRolesService = new UserRolesService(userRolesRepositoryMySQL);
    const userRolesController = new UserRolesController(userRolesService);

    return UserRoutesRoutes(userRolesController);
}