const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Organisation = sequelize.define('Organisation', {
  orgId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'organisations'
});

Organisation.associate = (models) => {
  Organisation.belongsToMany(models.User, { through: 'UserOrganisations', foreignKey: 'orgId' });
};

module.exports = Organisation;
