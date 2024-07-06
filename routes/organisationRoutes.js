const express = require('express');
const { body } = require('express-validator');
const organisationController = require('../controllers/organisationcontroller');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', auth, organisationController.getOrganisations);

router.get('/:orgId', auth, organisationController.getOrganisation);

router.post(
  '/',
  [
    body('name').isString().notEmpty(),
    body('description').isString(),
  ],
  validate,
  auth,
  organisationController.createOrganisation
);

router.post(
  '/:orgId/users',
  [
    body('userId').isString().notEmpty(),
  ],
  validate,
  auth,
  organisationController.addUserToOrganisation
);

module.exports = router;
