//Importation du modèle
const User = require('../models/User'); 
//Importation de file management
const fs = require('fs');

//Importation de la connection à la bdd
const mysqlconnection = require('../db/db.mysql');

//Controller GET One
exports.getOneUser = (req, res, next) => {
    
    mysqlconnection.query('SELECT id, pseudo, date_signup FROM user WHERE id = ?', req.params.id,  
        function (err, result) {
            if (err) {
                console.log('error 400');
                res.status(404).json({ error: 'Bad request' });
            }else{
                if (!result[0]) {
                    console.log('error 404 not found');
                    res.status(404).json({ error: 'No such User!' });
                } else {
                    console.log(result);
                    res.status(200).json(result[0]);
                }
            }
        }
    );
}

//Controller GET All From One
exports.getAllArticlesFromOne = (req, res, next) => {
    
    mysqlconnection.query('SELECT * FROM article WHERE user_id = ? ORDER BY date_post DESC', req.params.id,
        function (err, result) {
            if (err) {
                console.log('error 400 - lost access');
                res.status(400).json({ err });
            }else{
                res.status(200).json(result);
            }
        }
    );
}

//Controller DELETE
exports.deleteUser = (req, res, next) => {
    console.log('--> Passage dans la route DELETE User <--');

    //Récupération du user à supprimer
    mysqlconnection.query('SELECT * FROM user WHERE id = ?', req.params.id,  
    function (err, result) {
        if (err) {
            console.log('error wrong way');
            res.status(400).json( { error: 'Wrong request' } );
        }else{
            const user = result[0];
            if (!user){
                console.log('error 404 not found');
                res.status(404).json( { error: 'No such User!' } );
            } else {

                //Vérification que la demande de suppression vient de l'utilisateur lui même ou de l'admin
                if (result[0].user_id !== req.auth.user_id && req.auth.user === 0) {
                    console.log('Unauthorized request!');
                    res.status(400).json( { error: new Error('Unauthorized request!') } );
                } else {
                    if (result[0].user_id === req.auth.user_id && req.auth.user === 1)
                    {
                        console.log(`T'es fou t'es admin !`);
                        res.json( { error: new Error('Admin : do not delete yourself!') } );
                    } else {
                        //suppression de la donnée
                        mysqlconnection.query('DELETE FROM user WHERE id = ?', req.params.id,  
                        function (err, result) {
                            if (err) {
                                console.log('erreur de suppression');
                                res.status(400).json({ error });
                            }else{
                                res.status(200).json('Profil supprimé');
                                console.log('Profil supprimé');
                            }
                        });
                    }
                }
            }

        }
    });
}