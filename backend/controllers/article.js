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
    console.log('--> Passage dans la route PUT <--');
    var newDataArticle = [];

    //Récupération de l'article à modifier
    mysqlconnection.query('SELECT * FROM article WHERE id = ?', req.params.id,  
    async function (err, result) {
        if (err) {
            console.log('error 404 not found');
            res.status(404).json( { error: new Error('No such Article!') } );
        }else{
            const article = result[0];

            //Vérification que la demande de modification vient de l'auteur de l'article
            if (result[0].user_id !== req.auth.user_id) {
                console.log('Unauthorized request!');
                res.status(400).json( { error: new Error('Unauthorized request!') } );
            } 

            //Différenciation des données à récupérer selon si l'image est mise à jour
            if (req.file){
                const filename = article.imageUrl.split('/images/')[1];
                fs.unlinkSync(`images/${filename}`);
                newDataArticle.push(req.body.title, req.body.description, `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, req.params.id);  
            } else {
                newDataArticle.push(req.body.title, req.body.description, article.imageUrl, req.params.id);
                console.log(newDataArticle);
            }

            //Modification de la donnée
            mysqlconnection.query('UPDATE article SET title = ?, description = ?, imageUrl = ? WHERE id = ?', newDataArticle,  
            function (err, result) {
                if (err) {
                    console.log('erreur de modification');
                    res.status(400).json({ error });
                }else{
                    res.status(200).json('Article modifié');
                    console.log('Article modifié');
                }
            });
        }
    });
}

//Controller DELETE
exports.deleteArticle = (req, res, next) => {
    console.log('--> Passage dans la route DELETE <--');
    console.log(req.params.id);

    //Récupération de l'article à supprimer
    mysqlconnection.query('SELECT * FROM article WHERE id = ?', req.params.id,  
    function (err, result) {
        if (err) {
            console.log('error 404 not found');
            res.status(404).json( { error: new Error('No such Article!') } );
        }else{
            const article = result[0];

            //Vérification que la demande de modification vient de l'auteur de l'article
            if (result[0].user_id !== req.auth.user_id) {
                console.log('Unauthorized request!');
                res.status(400).json( { error: new Error('Unauthorized request!') } );
            } else {
                const filename = article.imageUrl.split('/images/')[1];
                fs.unlinkSync(`images/${filename}`);

                //suppression de la donnée
                mysqlconnection.query('DELETE FROM article WHERE id = ?', req.params.id,  
                function (err, result) {
                    if (err) {
                        console.log('erreur de suppression');
                        res.status(400).json({ error });
                    }else{
                        res.status(200).json('Article supprimé');
                        console.log('Article supprimé');
                    }
                });
            }


        }
    });
}
