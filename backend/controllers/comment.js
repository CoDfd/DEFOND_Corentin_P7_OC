//Importation du modèle
const Comment = require('../models/Comment'); 

//Importation de la connection à la bdd
const mysqlconnection = require('../db/db.mysql');

//controller POST
exports.createComment = (req, res, next) => {
    const date_post = Date.now();
    const comment = new Comment (req.body.article_id, req.auth.user_id, req.body.description, date_post);

    //La requête SQL pour envoyer les données dans la table comment
    mysqlconnection.query('INSERT INTO comment SET ?', comment, 
    function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).json({ err });
        }else{
            res.status(201).json({message : `Commentaire enregistré !`});
            }
        }
    );   
}

//controller GET all comments related to one article
exports.getAllComments = (req, res, next) => {

    //La requête SQL pour récupérer les données dans la table comment
    mysqlconnection.query('SELECT comment.id, comment.article_id, comment.description, comment.date_post, user.pseudo FROM comment JOIN user WHERE comment.user_id = user.id AND comment.article_id = ? ORDER BY comment.date_post DESC', req.params.article_id,
        function (err, result) {
            if (err) {
                res.status(500).json({ error });
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
                res.status(500).json({ error: 'Bad request' });
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

//controller DELETE
exports.deleteComment = (req, res, next) => {
    console.log('--> Passage dans la route DELETE COMMENT <--');

    //Récupération du comment à supprimer pour checks sécurité
    mysqlconnection.query('SELECT * FROM comment WHERE id = ?', req.params.id,  
    function (err, result) {
        if (err) {
            console.log('error wrong way');
            res.status(500).json( { error: 'Wrong request' } );
        } else {
            const comment = result[0];
            if (!comment){
                console.log('error 404 not found');
                res.status(404).json( { error: 'No such Comment!' } );
            } else {

                //Vérification que la demande de modification vient de l'auteur de l'article ou l'admin
                if (result[0].user_id !== req.auth.user_id && req.auth.user_role === 0 ) {
                    console.log('Unauthorized request!');
                    res.status(401).json( { error: new Error('Unauthorized request!') } );
                } else {

                        //suppression de la donnée
                        mysqlconnection.query('DELETE FROM comment WHERE id = ?', req.params.id,  
                        function (err, result) {
                            if (err) {
                                console.log('erreur de suppression');
                                res.status(500).json({ error });
                            }else{
                                res.status(200).json('Commentaire supprimé');
                                console.log('Commentaire supprimé');
                            }
                        });
                }
            }

        }
    });
}
