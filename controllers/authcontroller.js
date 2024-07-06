const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Organisation = require('../models/organisation');

exports.register = async (req, res) => {

  try {
    console.log('Request Body:', req.body);
    const { userId, firstName, lastName, email, password, phone } = req.body;
    if (!userId || !firstName || !lastName || !email || !password || !phone) {
        return res.status(400).json({ status: 'fail', message: 'All fields are required' });
      }
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ status: 'fail', message: 'Email already in use' });
        }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userId,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

    console.log('Created User:', user);

    const org = await Organisation.create({
      orgId: `org-${userId}`,
      name: `${firstName}'s Organisation`,
      description: `${firstName}'s default organisation`
    });

    console.log('Created Organisation:', org);

    await user.addOrganisation(org);

    const token = jwt.sign({ id: user.userId }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        }
      }
    });
  } catch (error) {
    console.error('Registration Error:', error);  // Log the error for debugging
    res.status(400).json({
      status: 'Bad request',
      message: 'Registration unsuccessful',
      statusCode: 400
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: 'Bad request',
        message: 'Authentication failed',
        statusCode: 401
      });
    }

    const token = jwt.sign({ id: user.userId }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
