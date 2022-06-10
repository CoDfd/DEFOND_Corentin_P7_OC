//Importation du modèle
const Article = require('../models/Article'); 
//Importation de file management
const fs = require('fs');

//const mysql2 = require('mysql2/promise');

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
            console.log('error wrong way');
            res.status(400).json( { error: 'Wrong request' } );
        }else{
            const article = result[0];
            if (!article){
                console.log('error 404 not found');
                res.status(404).json( { error: 'No such Article!' } );
            } else {

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
        }
    });
}

//Controller DELETE
exports.deleteArticle = (req, res, next) => {
    console.log('--> Passage dans la route DELETE <--');

    //Récupération de l'article à supprimer
    mysqlconnection.query('SELECT * FROM article WHERE id = ?', req.params.id,  
    function (err, result) {
        if (err) {
            console.log('error wrong way');
            res.status(400).json( { error: 'Wrong request' } );
        }else{
            const article = result[0];
            if (!article){
                console.log('error 404 not found');
                res.status(404).json( { error: 'No such Article!' } );
            } else {

                //Vérification que la demande de modification vient de l'auteur de l'article
                if (result[0].user_id !== req.auth.user_id) {
                    console.log('Unauthorized request!');
                    res.status(400).json( { error: new Error('Unauthorized request!') } );
                } else {
                    const filename = article.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        
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
                    });
                }
            }

        }
    });
}

//Controller Like Article
exports.likeArticle = async (req, res, next) => {
    const userID = req.auth.user_id;
    const articleID = parseInt(req.params.id);
    const data_like_article = [userID, articleID];
    var like = 0;

    //récupération du nombre de likes
    await mysqlconnection.query('SELECT * FROM article WHERE id = ?', articleID,
    function (err, result) {
        if (err) {
            console.log('-->here1');
            console.log('error wrong way');
            res.status(400).json( { error: 'Wrong way' } );
        }else{
            if (!result[0]) {
                console.log('Article innexistant');
                res.status(400).json( { error: 'Article innexistant' } );
            } else {
                console.log('récup des likes');
                like = result[0].likes;



    //Récupération de la donnée de like dans like_articles
    console.log(data_like_article);
    mysqlconnection.query('SELECT * FROM like_articles WHERE user_id = ? AND article_id = ?', data_like_article,  
    function (err, result) {
        if (err) {
            console.log('-->here2');
            console.log('error wrong way');
            res.status(400).json( { error: 'Wrong way' } );
        }else{
            const like_article = result[0];
            console.log('pass here');
            console.log(like_article);

            //si le user et l'article correspondent : déjà un like
            if (like_article){
                //cas enlenver le liker
                if (req.body.like == 0) {
                    mysqlconnection.query('DELETE FROM like_articles WHERE user_id = ? AND article_id = ?', data_like_article, 
                    function (err, result){
                        if (err) {
                            console.log('dislike failed');
                            res.status(400).json( { error: 'dislike failed' } );
                        } else {
                            like --;
                            const data_likes_send = [like, articleID];
                            mysqlconnection.query('UPDATE article SET likes = ? WHERE id = ?', data_likes_send,
                            function (err, result) {
                                if (err) {
                                    console.log('-->here4');
                                    console.log('error wrong way');
                                    res.status(400).json( { error: 'Wrong way' } );
                                }else{
                                    res.status(200).json('Article modifié : likes incrémentés');
                                    console.log('Article modifié : likes incrémentés');
                                }
                            });
                        }
                    });
                } 
                //cas like déjà donné
                else {
                    console.log('Article déjà liké');
                    res.status(400).json( { error: 'Article déjà liké' } );
                }   
            } 
            //si le user et l'article ne correspondent pas : like à donnée si req.body.like=1, erreur sinon
            else {
                //le user n'a jamais liké et veut enlever son like : erreur
                if (req.body.like == 0) {
                    console.log('-->here3')
                    console.log('Wrong way');
                    res.status(400).json( { error: 'wrong way' } );
                } 
                //le user donne son like qu'il n'avait jamais donné
                else {
                    mysqlconnection.query('INSERT INTO like_articles(user_id, article_id) VALUES (?, ?)', data_like_article, 
                    function (err, result){
                        if (err) {
                            console.log('like failed');
                            res.status(400).json( { error: 'Like failed' } );
                        } else {
                            like ++;
                            console.log(like);
                            const data_likes_send = [like, articleID];
                            mysqlconnection.query('UPDATE article SET likes = ? WHERE id = ?', data_likes_send,
                            function (err, result) {
                                if (err) {
                                    console.log('-->here4');
                                    console.log('error wrong way');
                                    res.status(400).json( { error: 'Wrong way' } );
                                }else{
                                    res.status(200).json('Article modifié : likes incrémentés');
                                    console.log('Article modifié : likes incrémentés');
                                }
                            });
                        }
                    });
                }
            }
        } 
    });





            }
        }
    });


 /*   const dblikes = await mysqlconnection.query('SELECT * FROM article WHERE id = ?', articleID);
    console.log(dblikes);
    like = dblikes[0].likes;*/



    //Ajout du like à l'article dans article.like
    /*console.log('incrémentation finale');
    console.log(like);
    const data_likes_send = [like, articleID];
    mysqlconnection.query('UPDATE article SET likes = ? WHERE id = ?', data_likes_send,
    function (err, result) {
        if (err) {
            console.log('-->here4');
            console.log('error wrong way');
            res.status(400).json( { error: 'Wrong way' } );
        }else{
            res.status(200).json('Article modifié : likes incrémentés');
            console.log('Article modifié : likes incrémentés');
        }
    });*/

}