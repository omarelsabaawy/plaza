const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/Registration', authController.getRegister);

router.post('/postLogin', authController.postLogin);

router.post('/postRegistration', authController.postRegister);

router.post('/logout', authController.postLogout);

module.exports = router;