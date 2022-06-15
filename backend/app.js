//import des paquets
const express = require(`express`); 
const mysql = require(`mysql`);
//Importation des variables d'environnement
require('dotenv').config();

//connexion aux routes
const authRoutes = require(`./routes/authentification`);
const articleRoutes = require(`./routes/article`);
const commentRoutes = require(`./routes/comment`);
const userRoutes = require(`./routes/user`);

const path = require('path');

//connection bdd
/*const mysqlconnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database : "Groupomania"
});

mysqlconnection.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});*/
const mysqlconnection = require('./db/db.mysql');

//Création de l'app par la méthode express
const app = express();

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.urlencoded({ extended : true }));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


//routes d'identification
app.use(`/api/auth`, authRoutes);

//routes de gestion des users
app.use('/api/users', userRoutes);

//routes de création d'articles
app.use(`/api/articles`, articleRoutes);

//routes de commentaires
app.use(`/api/comments`, commentRoutes);


module.exports = app;