# Projet Books
Ce projet est une API simple de gestion de livres de bibliothèque utilisant Express. L'API permet de créer, lire, mettre à jour et supprimer des livres dans une base de données Redis. Les livres sont stockés sous forme de hachages Redis, où chaque livre a des propriétés comme `id`, `title`, `author`, `year`, `genre`, et `status`.
## Fonctionnalités
- **Créer un livre** : Ajouter un nouveau livre avec toutes ses informations.
- **Lire tous les livres** : Récupérer la liste complète des livres.
- **Lire un livre spécifique** : Récupérer un livre par son ID unique.
- **Mettre à jour un livre** : Modifier les informations d'un livre existant.
- **Supprimer un livre** : Supprimer un livre de la base de données par son ID.
## Prérequis
- **Node.js** : [Télécharger et installer Node.js](https://nodejs.org/)
- **Redis** : [Télécharger et installer Redis](https://redis.io/download)
- **npm** (installé avec Node.js)
- **Système UNIX** : conseillé
## Installation
- **1-** Cloner ler projet
```bash
git clone https://github.com/brightmarc90/projet_books.git
cd projet_books
```
- **2-** Installer les dépendences
```bash
npm install
```
- **3-** Installer et démarrer Redis
Si vous aves déjà Redis installé sur votre machine démarrer le sinon, installez le. L'installation peut être plus ou moins complexe selon votre système d'exploitation.

Sur les systèmes Unix
```bash
# installation 
sudo apt install redis-server
# démarrer le service
sudo systemctl start redis
```
Sur MacOS
```bash
# installation 
brew install redis
# démarrer le service
brew services start redis
```
- **4-** Configuer Redis
Si vous vous connectez à Redis avec des identifiants, modifiez la string de connexion dans le fichier ``src/config/redisConfig.js`` pour l'adapter à votre environnement.
## Lancer le projet
Une fois les dépendances installées et Redis démarré, vous pouvez lancer l'application avec la commande suivante :
```bash
npm start
```
Cela démarrera le serveur sur http://localhost:3000.
## documentation de l'API
Une fois le serveur démarré, vous pouvez accéder à la documentation interactive de l'API via l'interface Swagger à l'adresse suivante : [http://localhost:3000/api-docs](http://localhost:3000/api-docs) pour tester toutes les routes.