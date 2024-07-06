const express = require('express');
const userController = require('../controllers/usercontroller');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:id', auth, userController.getUser);

module.exports = router;
