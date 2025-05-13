// src/index.ts
import express from 'express';
import { createUserModule } from './modules/users';
import { errorHandler } from '@middlewares/errorHandler';
import { createRoleModule } from '@modules/roles';
import { createUserRolesModule } from '@modules/user-roles';
import { createAuthTokenModule } from '@modules/auth-token';
import { getDatabase } from '@db/DatabaseClient';
import { createContentBlockModule } from '@modules/content-blocks';
import cors from 'cors';


const app = express();
const port = 3000;

// Enable CORS
app.use(cors({
  origin: process.env.FRONT_DASHBOARD || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true //  if i want to enable cookies or authentication headers
}));

// Middleware global
app.use(express.json());

// Landing page for the moment
app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Welcome to Datte C1 ! \n Version 1.0.0 \n By Datte - C1 \n http:localhost:3000/api/v0.0.2');
});


async function loadModules() {
  const userModule = await createUserModule();
  const roleModule = await createRoleModule();
  const userRolesModule = await createUserRolesModule();
  const authTokenModule = await createAuthTokenModule();
  const contentBlockModule = await createContentBlockModule();


  return {
    userModule,
    roleModule,
    userRolesModule,
    authTokenModule,
    contentBlockModule,
  };
}

async function startServer() {
  try {
    await getDatabase();
    console.log("📌 Database connected");

    // Load modules
    const modules = await loadModules();

    // Create router for prefix : /api/v0.0.2
    const apiRouter = express.Router();

    // Add module's here
    apiRouter.use('/users', modules.userModule);
    apiRouter.use('/userroles', modules.userRolesModule);
    apiRouter.use('/auth', modules.authTokenModule);
    apiRouter.use('/roles', modules.roleModule);
    apiRouter.use('/contentblocks', modules.contentBlockModule);

    app.use('/api/v0.0.2', apiRouter);

    // Middleware global of error
    app.use(errorHandler);

    // Run server only after database connection
    app.listen(port, () => {
      console.log(`📌 Serveur en cours d'exécution sur le port ${port}`);
    });

  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

// 🚀 Run Datte
startServer();
