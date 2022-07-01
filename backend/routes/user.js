const express = require(`express`);
const router = express.Router();

//appel du controller
const userCtrl = require(`../controllers/user`);

//appels des middlewares
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

//route GET one
router.get('/:id', auth, userCtrl.getOneUser);
//route GET articles from one
router.get('/:id/articles', auth, userCtrl.getAllArticlesFromOne)
//route DELETE
router.delete('/:id', auth, userCtrl.deleteUser);


module.exports = router;