const express = require(`express`);
const router = express.Router();

//appel du controller
const articleCtrl = require(`../controllers/article`);

//appels des middlewares
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

//route POST
router.post('/', auth, multer, articleCtrl.createArticle); 
//route GET all
router.get('/', auth, articleCtrl.getAllArticles);
//route GET one
router.get('/:id', auth, articleCtrl.getOneArticle);
//route GET all from one
//router.get('/:user_id', auth, articleCtrl.getAllArticlesFromOne);
//route PUT
router.put('/:id', auth, multer, articleCtrl.modifyArticle);
//route DELETE
router.delete('/:id', auth, articleCtrl.deleteArticle);
//route Like
router.post('/:id/like', auth, articleCtrl.likeArticle);


module.exports = router;