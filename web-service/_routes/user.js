const express = require('express');
const router = express.Router();
const userController = require('../_controllers').user;
const userValidator = require('../_validators').user;

router.post('/authenticate', userValidator.authenticate, userController.authenticate);

module.exports = router;
