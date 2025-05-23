const express = require('express');
const app = express();
const router = express.Router();
const {welcomeController, registerController, loginController, resetController, logoutController} = require('../controller/authController');

router.get('/', welcomeController);
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/reset-password', resetController);
router.post('/logout', logoutController);
module.exports = router;