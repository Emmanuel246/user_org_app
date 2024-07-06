const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user_org_db', 'root', 'Qwerty@1234', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
