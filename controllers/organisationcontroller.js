const Organisation = require('../models/organisation');
const User = require('../models/user');

exports.getOrganisations = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: Organisation
    });

    const organisations = user.Organisations;

    res.status(200).json({
      status: 'success',
      message: 'Organisations fetched successfully',
      data: {
        organisations
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

exports.getOrganisation = async (req, res) => {
  try {
    const organisation = await Organisation.findByPk(req.params.orgId);

    if (!organisation) {
      return res.status(404).json({
        status: 'Not found',
        message: 'Organisation not found',
        statusCode: 404
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Organisation fetched successfully',
      data: organisation
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

exports.createOrganisation = async (req, res) => {
  const { name, description } = req.body;

  try {
    const org = await Organisation.create({
      orgId: `org-${Date.now()}`,
      name,
      description
    });

    const user = await User.findByPk(req.user.id);
    await user.addOrganisation(org);

    res.status(201).json({
      status: 'success',
      message: 'Organisation created successfully',
      data: org
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad request',
      message: 'Client error',
      statusCode: 400
    });
  }
};


exports.addUserToOrganisation = async (req, res) => {
    const { userId } = req.body;
  
    try {
      const organisation = await Organisation.findByPk(req.params.orgId);
      const user = await User.findByPk(userId);
  
      if (!organisation || !user) {
        return res.status(404).json({
          status: 'Not found',
          message: 'User or Organisation not found',
          statusCode: 404
        });
      }
  
      await organisation.addUser(user);
  
      res.status(200).json({
        status: 'success',
        message: 'User added to organisation successfully',
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  };
  