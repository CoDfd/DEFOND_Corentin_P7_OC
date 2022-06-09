//import de mysql
const mysql = require('mysql');

//connection bdd
const mysqlconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database : "Groupomania"
  });
  
  mysqlconnection.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
    console.log(`Connected as ${mysqlconnection.threadId}`);
  });

  //Export
  module.exports = mysqlconnection;