"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const users_1 = require("./modules/users"); // Le module utilisateur
const app = (0, express_1.default)();
const port = 3000;
// Middleware global
app.use(express_1.default.json());
// Ajout du module utilisateur
app.use('/api/v0.0.1/users', (0, users_1.createUserModule)());
app.get('/', (req, res) => {
    res.send('Bonjour !');
});
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
