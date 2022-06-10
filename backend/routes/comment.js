const express = require(`express`);
const router = express.Router();

//appel du controller
const commentCtrl = require(`../controllers/comment`);

//appels des middlewares
const auth = require('../middleware/auth');
const check_article = require('../middleware/check-article');

//route POST
router.post('/', auth, check_article, commentCtrl.createComment); 
//route GET all
router.get('/', auth, check_article, commentCtrl.getAllComments);
//route GET one
router.get('/:id', auth, commentCtrl.getOneComment);
//route PUT
//router.put('/:id', auth,);
//route DELETE
router.delete('/:id', auth, commentCtrl.deleteComment);



module.exports = router;