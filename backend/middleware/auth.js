//Importation de jasonwebtoken
const jwt = require(`jsonwebtoken`);

//Importation des variables d'environnement
require('dotenv').config();

//Importation de la connection à la bdd
const mysqlconnection = require('../db/db.mysql');

module.exports = (req, res, next) => {
    try {
        console.log('--> Passage dans le middleware auth <--');
        const token = req.headers.authorization.split(` `)[1];
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userID = decodedToken.user_id;
        const userRole = decodedToken.user_role;
        console.log('- userID :');
        console.log(userID);

        //findone si l'user est en bdd
        mysqlconnection.query('SELECT * FROM user WHERE id = ?', userID,     
        function (err, result) {
            if (err) {
                console.log('User ID non valable !');
                throw `User ID non valable !`;
            } else {
                if (!result[0]){
                    console.log('User ID non valable !');
                    throw `User ID non valable !`;
                } else {
                    req.auth = { user_id: userID, user_role : userRole };
                    console.log('Authentification réussie');
                    next();
                }

            }
        })
        
        /*console.log(req.originalUrl);
        console.log('here');
        console.log(req);
        console.log(userID);
        const body = JSON.parse(JSON.stringify(req.body));
        console.log(body);
        console.log(req.body.user_id);
        if (req.body.user_id && parseInt(req.body.user_id) !== userID){
            console.log('User ID non valable !');
            throw `User ID non valable !`;
        } else {
            console.log('cest passé l auth');
            next();
        }*/
    } catch (error) {
        res.status(401).json({ error: 'Requête non authentifiée'});
    }
};