// src/index.ts
import express from 'express';
import { createUserModule } from './modules/users'; // Le module utilisateur

const app = express();
const port = 3000;

// Middleware global
app.use(express.json());

// Ajout du module utilisateur
app.use('/api/v0.0.1/users', createUserModule());

app.get('/', (req, res) => {
  res.send('Bonjour !');
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
