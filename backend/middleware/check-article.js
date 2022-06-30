//Importation de la connection à la bdd
const mysqlconnection = require('../db/db.mysql');

module.exports = (req, res, next) => {
    try {
        //checks
        console.log('--> entrée dans le middleware de check pour les commentaires');
        console.log(req.params.article_id);

        //findone si l'article est en bdd
        mysqlconnection.query('SELECT * FROM article WHERE id = ?', req.params.article_id,     
        function (err, result) {
            if (err) {
                console.log('Bad request');
                throw `Bad request`;
            } else {
                if (!result[0])
                {
                    console.log('Article innexistant');
                    res.status(401).json({ error: 'Article innexistant'});
                } else {
                    console.log('Article existant');
                    next();
                }
            }
        })
    } catch (error) {
        res.status(401).json({ error: 'Article innexistant'});
    }
};