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
//route PUT
router.put('/:id', auth, multer, articleCtrl.modifyArticle);
//route DELETE
router.delete('/:id', auth, articleCtrl.deleteArticle);


module.exports = router;