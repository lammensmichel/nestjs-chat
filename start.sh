#!/bin/bash

# Vérifie si Docker est installé
if ! [ -x "$(command -v docker)" ]; then
  echo "Erreur : Docker n'est pas installé. Installez Docker pour continuer." >&2
  exit 1
fi

# Vérifie si Docker Compose est installé
if ! [ -x "$(command -v docker-compose)" ]; then
  echo "Erreur : Docker Compose n'est pas installé. Installez Docker Compose pour continuer." >&2
  exit 1
fi

# Construire et démarrer les conteneurs
echo "Démarrage des services avec docker-compose up --build..."
docker-compose up --build
