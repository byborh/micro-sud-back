import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Bonjour !');
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
