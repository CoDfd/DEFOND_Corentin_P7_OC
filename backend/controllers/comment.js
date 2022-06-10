//Importation du modèle
const Comment = require('../models/Comment'); 

//Importation de la connection à la bdd
const mysqlconnection = require('../db/db.mysql');

//controller POST
exports.createComment = (req, res, next) => {
    const comment = new Comment (req.body.article_id, req.auth.user_id, req.body.description);

    //La requête SQL pour envoyer les données dans la table comment
    mysqlconnection.query('INSERT INTO comment SET ?', comment, 
    function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).json({ error });
        }else{
            res.status(201).json({message : `Commentaire enregistré !`});
            }
        }
    );   
}

//controller GET all comments related to one article
exports.getAllComments = (req, res, next) => {

    //La requête SQL pour récupérer les données dans la table comment
    mysqlconnection.query('SELECT * FROM comment WHERE article_id = ?', req.body.article_id,
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

//controller GET one comment
exports.getOneComment = (req, res, next) => {

    //La requête SQL pour récupérer les données dans la table comment
    mysqlconnection.query('SELECT * FROM comment WHERE id = ?', req.params.id,  
        function (err, result) {
            if (err) {
                console.log('error 400');
                res.status(404).json({ error: 'Bad request' });
            }else{
                if (!result[0]) {
                    console.log('error 404 not found');
                    res.status(404).json({ error: 'No such Comment!' });
                } else {
                    console.log(result);
                    res.status(200).json(result[0]);
                }
            }
        }
    );
}

