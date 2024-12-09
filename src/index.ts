import express from 'express';
import { UserController } from './users/controller/UserController';
import { UserService } from './users/service/UserService';
import { UserRepository } from './users/repository/UserRepository';

// IL FAUT MODIFIER CE FICHIER
// il faut que je sépares les lancement des modules de l'application
// car, actuellement, c'est très lié à ce fichier et ça risque de mal finir avec 10000000 lignes de codes dans le même fichier

const app = express();
const port = 3000;

// Récupération des classes et création des instances
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

app.get('/', (req, res) => {
  res.send('Bonjour !');
});

// Route pour récupérer un utilisateur par ID
app.get('/users/:id', (req, res) => userController.getUserById(req, res));

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});