//import de mysql
const mysql = require('mysql');

//Importation des variables d'environnement
require('dotenv').config();

//connection bdd
const mysqlconnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database : process.env.MYSQL_DB_NAME
  });
  
  mysqlconnection.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
    console.log(`Connected as ${mysqlconnection.threadId}`);
  });

  //Export
  module.exports = mysqlconnection;