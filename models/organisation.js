const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Organisation = sequelize.define('Organisation', {
  orgId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Organisation;

// module.exports = (sequelize, DataTypes) => {
//   const Organisation = sequelize.define('Organisation', {
//     orgId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     description: {
//       type: DataTypes.STRING
//     }
//   });

//   Organisation.associate = function(models) {
//     Organisation.belongsToMany(models.User, {
//       through: 'UserOrganisation',
//       foreignKey: 'OrganisationId'
//     });
//   };

//   return Organisation;
// };
