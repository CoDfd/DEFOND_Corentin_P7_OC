//Importation de bcrypt pour hasher le pasword
const bcrypt = require(`bcrypt`);

//Import de crypto-js pour chiffrer le mail
const cryptojs = require(`crypto-js`);

//Importation de jasonwebtoken
const jwt = require(`jsonwebtoken`);

//Importation du modèle
const User = require('../models/User'); 

//Importation de la connection à la bdd
const mysqlconnection = require('../db/db.mysql');

//signup pour créer un compte
exports.signup = (req, res, next) => {
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `GROUPOMANIA`)
        .toString();
    
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
                
                    mysqlconnection.query('SELECT * FROM user WHERE pseudo = ?', req.body.pseudo,     
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
                                            const user = new User(emailCryptoJs, req.body.pseudo, hash);
                                            console.log('-->user');
                                            console.log(user);

                                            //La requête SQL pour envoyer les donénes dans la table user
                                            mysqlconnection.query('INSERT INTO user SET ?', user, 
                                                function (err, result) {
                                                    if (err) {
                                                        console.log(err);
                                                        res.status(400).json({ error });
                                                    }else{
                                                        res.json({message : `Utilisateur ${req.body.pseudo} enregistré`});
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
    const  emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `GROUPOMANIA`)
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
                                { user_id: user.id },
                                `GROUPOMANIA`,
                                { expiresIn: `24h` }
                            );
                            console.log(token);
                            res.status(200).json({
                                user_id: user.id,
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