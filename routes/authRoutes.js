const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authcontroller');
const validate = require('../middleware/validate');

const router = express.Router();

router.post(
  '/register',
  [
    body('userId').isString().notEmpty(),
    body('firstName').isString().notEmpty(),
    body('lastName').isString().notEmpty(),
    body('email').isEmail().notEmpty(),
    body('password').isString().notEmpty()
  ],
  validate,
  authController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().notEmpty(),
    body('password').isString().notEmpty(),
  ],
  validate,
  authController.login
);

module.exports = router;
