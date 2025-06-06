#!/bin/bash

# Lancer Redis avec Docker
echo "🟥 Démarrage de Redis..."
docker run -d \
  --name my-redis \
  -p 6379:6379 \
  redis

# Attendre un peu pour s'assurer que Redis est bien lancé
sleep 2

# Vérifier que Redis tourne
if docker ps | grep -q my-redis; then
  echo "✅ Redis est lancé sur le port 6379."
else
  echo "❌ Échec du lancement de Redis."
  exit 1
fi

# Lancer le serveur Node.js
echo "🚀 Lancement du serveur Node.js..."
npm run start
