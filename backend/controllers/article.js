//Importation du modèle
const Article = require('../models/Article'); 
//Importation de file management
const fs = require('fs');

//Importation de la connection à la bdd
const mysqlconnection = require('../db/db.mysql');

//Controller POST
exports.createArticle = (req, res, next) => {
    console.log('--> Passage dans la route POST <--');
    var article;
    const zero = 0;

    //initialisation de la requete
    if (req.file){
        article = new Article(req.auth.user_id, req.body.title, req.body.description, `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, zero );
    } else {
        article = new Article(req.auth.user_id, req.body.title, req.body.description, ``, zero );
    }
    console.log(article);

    //La requête SQL pour envoyer les donénes dans la table user
    mysqlconnection.query('INSERT INTO article SET ?', article, 
    function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).json({ error });
        }else{
            res.status(201).json({message : `Article enregistré !`});
            }
        }
    );    

};

//Controller GET all
exports.getAllArticles = (req, res, next) => {
    
    mysqlconnection.query('SELECT * FROM article', 
        function (err, result) {
            if (err) {
                console.log('error 400 - lost access');
                res.status(400).json({ error });
            }else{
                res.status(200).json(result);
            }
        }
    );
}

//Controller GET One
exports.getOneArticle = (req, res, next) => {
    
    mysqlconnection.query('SELECT * FROM article WHERE id = ?', req.params.id,  
        function (err, result) {
            if (err) {
                console.log('error 404 not found');
                res.status(400).json({ error });
            }else{
                res.status(200).json(result[0]);
            }
        }
    );
}

//Controller PUT
exports.modifyArticle = (req, res, next) => {
    var newDataArticle = [];

    if (req.file){
 //       const articleObject = JSON.parse(req.body.article);
        mysqlconnection.query('SELECT * FROM article WHERE id = ?', req.params.id,  
        function (err, result) {
            if (err) {
                console.log('error 404 not found');
                res.status(400).json({ error });
            }else{
                const article = result[0];
                const filename = article.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    newDataArticle.push(req.body.title, req.body.description, `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, req.params.id);
                    mysqlconnection.query('UPDATE article SET title = ?, description = ?, imageUrl = ? WHERE id = ?', newDataArticle,  
                    function (err, result) {
                        if (err) {
                            console.log('erreur d update');
                            res.status(400).json({ error });
                        }else{
                            res.status(200).json('Article modifié');
                            console.log('Article modifié AVEC file');
                        }
                    })
                })
            }
        }
    );
    } else {
 //       const articleObject = req.body;
        newDataArticle.push(req.body.title, req.body.description, req.params.id);
        mysqlconnection.query('UPDATE article SET title = ?, description = ? WHERE id = ?', newDataArticle,  
        function (err, result) {
            if (err) {
                console.log('erreur d update');
                res.status(400).json({ error });
            }else{
                res.status(200).json('Article modifié');
                console.log('Article modifié par la voie sans file');
            }
        })
    }
}
