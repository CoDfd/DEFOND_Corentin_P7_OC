const express = require(`express`);
const router = express.Router();

//appel du controller
const authCtrl = require(`../controllers/authentification`);

//appels des middlewares
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

//route signup
router.post('/signup', authCtrl.signup);
//route login
router.post('/login', authCtrl.login);
//route logout
router.delete('/logout', auth, authCtrl.logout);

module.exports = router;