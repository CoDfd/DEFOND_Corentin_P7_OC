//Importation de bcrypt pour hasher le pasword
const bcrypt = require(`bcrypt`);

//Import de crypto-js pour chiffrer le mail
const cryptojs = require(`crypto-js`);

//Importation de jasonwebtoken
const jwt = require(`jsonwebtoken`);

//Importation du modèle
const User = require('../models/User'); 

//Importation des variables d'environnement
require('dotenv').config();

//Importation de la connection à la bdd
const mysqlconnection = require('../db/db.mysql');
const { end } = require('../db/db.mysql');

//signup pour créer un compte
exports.signup = (req, res, next) => {
    const date_signup = Date.now();
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, process.env.CRYPTOJS_SECRET)
        .toString();
    var pseudo;
    if (!req.body.pseudo) {
        pseudo = req.body.email.split(`@`)[0];
    } else {
        pseudo = req.body.pseudo;        
    }
    
    //Check si le pseudo ou l'email est déjà existant
    mysqlconnection.query('SELECT * FROM user WHERE email = ?', emailCryptoJs,     
        function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).json({ error });
            } else {
                if (result != 0) {
                    return res.status(401).json({ error: 'Email déjà existant dans la base de donnée !'});
                } else {
                
                    mysqlconnection.query('SELECT * FROM user WHERE pseudo = ?', pseudo,     
                        function (err, result) {
                            if (err) {
                                console.log(err);
                                res.status(400).json({ error });
                            } else {
                                if (result != 0) {
                                    return res.status(401).json({ error: 'Pseudo déjà existant dans la base de donnée !'});
                                } else {

                                    bcrypt.hash(req.body.password, 10) 
                                        .then(hash => {
                                            // envoi à MySQL
                                            const user = new User(emailCryptoJs, pseudo, hash, date_signup);
                                            console.log('-->user');
                                            console.log(user);

                                            //La requête SQL pour envoyer les donénes dans la table user
                                            mysqlconnection.query('INSERT INTO user SET ?', user, 
                                                function (err, result) {
                                                    if (err) {
                                                        console.log(err);
                                                        res.status(400).json({ error });
                                                    }else{
                                                        res.json({message : `Utilisateur ${pseudo} enregistré`});
                                                    }
                                                }
                                            );
                                        })
                                        .catch(error => res.status(500).json({error}));
                                    }
                            }
                        });
                    }
                }
            
        }
    );
};

//login 
exports.login = (req, res, next) => {
    //Qui se connecte?
    console.log(`-->ID de l'user qui se connecte`);
    console.log(req.body.email);
    const  emailCryptoJs = cryptojs.HmacSHA256(req.body.email, process.env.CRYPTOJS_SECRET)
    .toString();
    console.log(emailCryptoJs);

    //requête pour trouver l'email avec la bdd
    mysqlconnection.query('SELECT * FROM user WHERE email = ?', emailCryptoJs,     
        function (err, result) {
            if (err) {
                console.log(err);
                res.status(401).json({ error : 'Utilisateur non trouvé !'});
            } else {
                if (result == 0) {
                    return res.status(404).json({ error: 'Utilisateur inexistant dans la base de donnée !'});
                } else {
                    console.log(`Utilisateur ${result[0].pseudo} trouvé`);
                    console.log(result[0]);
                    const user = result[0];

    //Comparaison du mdp avec bcrypt
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                console.log('Authentification failed : wrong password');
                                return res.status(401).json({ error: 'Mot de passe invalide !'});
                            }
                            console.log('Mot de passe correct !');
                            console.log(user.id);
                            console.log(typeof user.id);
                            const token = jwt.sign(
                                { user_id: user.id,
                                  user_role : user.admin},
                                process.env.JWT_SECRET,
                                { expiresIn: process.env.JWT_EXPIRES }
                            );
                            console.log(token);
                            res.status(200).json({
                                user_id: user.id,
                                user_role : user.admin,
                                token: token 
                            });
                        })
                        .catch(error =>  
                            {
                                res.status(500).json({error});
                        });
                    }
                }
            }
    );
};

//logout
exports.logout = (req, res, next) => {
    const token = req.headers.authorization.split(` `)[1];
    jwt.sign(token, " ", { expiresIn: `1ms` }, (logout, err) => {
        if (logout) {
            res.json({ status : 'Bye !'});
            //res.redirect('/'); 
        } else {
            res.status(400).json({error :'Unable to log out'});
        }
    }
    );
}