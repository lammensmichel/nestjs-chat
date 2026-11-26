# Utilise l'image officielle de PostgreSQL
FROM postgres:15

# Définir les variables d'environnement pour configurer PostgreSQL
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=mydatabase

# Expose le port par défaut de PostgreSQL
EXPOSE 5432
