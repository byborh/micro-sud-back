// src/index.ts
import express from 'express';
import { createUserModule } from './modules/users'; // Le module utilisateur
import { errorHandler } from '@middlewares/errorHandler';
import { initDatabase } from '@db/drivers/AppDataSource';

const app = express();
const port = 3000;

// Middleware global
app.use(express.json());

// Add the user module
app.use('/api/v0.0.1/users', createUserModule());

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


