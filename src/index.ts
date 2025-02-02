// src/index.ts
import express from 'express';
import { createUserModule } from './modules/users';
import { createPermissionModule } from './modules/permissions';
import { errorHandler } from '@middlewares/errorHandler';
import { initDatabase } from '@db/drivers/AppDataSource';
import { createRoleModule } from '@modules/roles';

const app = express();
const port = 3000;

// Middleware global
app.use(express.json());

// Add module's here
app.use('/api/v0.0.1/users', createUserModule());
app.use('/api/v0.0.1/permissions', createPermissionModule());
app.use('/api/v0.0.1/roles', createRoleModule());
// Add other modules HERE


// Middleware global of error
app.use(errorHandler);

// Landing page for the moment
app.get('/', (req, res) => {
  res.send('Welcome to Datte D1 ! \n Version 0.0.1 \n By DatteD1 \n http:localhost:3000/api/v0.0.1/users');
});

// Initialize the db before the database
initDatabase().then(() => {
  // Run the server
  app.listen(port, () => {
    console.log(`📌 Serveur en cours d'exécution sur le port ${port}`);
  });
}).catch ((error) => {
  // Catch errors
  console.error("Error initializing database:", error);
})


