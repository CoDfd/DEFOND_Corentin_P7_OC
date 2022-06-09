const express = require(`express`);
const router = express.Router();

//appel du controller
const userCtrl = require(`../controllers/user`);

//route signup
router.post('/signup', userCtrl.signup);
//route login
router.post('/login', userCtrl.login);

module.exports = router;