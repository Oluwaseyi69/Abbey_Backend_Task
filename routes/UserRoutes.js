const express = require('express');
const UserController = require('../controller/UserController');
const auth = require('../middleware/Auth')

const router = express.Router();


router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/update', auth.authenticate, UserController.update);




module.exports = router;
