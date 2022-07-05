# ----- Bienvenu dans le projet Groupalink -----

Formation Web Dev Openclassroom
Projet 7 - création du réseau social de l'entreprise Groupomania
Stack utilisé :
* VueJs
* Node + Express
* MySql

## ---- Backend ----

**Installation :**
Dans le terminal, placez vous dans le dossier > backend. 
Pour installer les paquets et les dépendances, lancez
    ``> npm install` 
Créer un fichier `.env` dans le dossier backend, dans lequel il faut rentrer les clés de hashage de sécurité, les ports et les identifiants de la base de donnée comme suit :

            <--->
            PORT = 3000


            //sécurité
            JWT_SECRET = 'GROUPOMANIA'
            JWT_EXPIRES = '24h'
            CRYPTOJS_SECRET = 'GROUPOMANIA'

            //Base de donnée
            MYSQL_HOST = "localhost"
            MYSQL_USER = "root"
            MYSQL_PWD = "27041993"
            MYSQL_DB_NAME = "Groupomania"
            <--->

Créez également un dossier `images` dans le dossier backend, qui servira à stocker les images des posts.

**Démarrage du server**
Ensuite, pour lancer le server, lancer toujours depuis le dossier backend la commande
    `> nodemon server`
ou 
    `> npm start`

Comme indiqué dans le fichier `.env`, le server doit fonctionner sur http://localhost:3000/

## ---- Frontend ----

**Installation :**
Dans le terminal, placez vous dans le dossier > frontend/groupomania_frontend, puis lancez
    `> npm install`

**Démarrage du serve :**
Depuis le même dossier, lancer 
    `> npm run serve`

Si le navigateur ne s'ouvre pas automatiquement allez à :
http://localhost:8080/
