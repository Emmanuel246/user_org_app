const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
});

module.exports = User;

// module.exports = (sequelize, DataTypes) => {
//     const User = sequelize.define('User', {
//       userId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//       },
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       phone: {
//         type: DataTypes.STRING
//       }
//     });
  
//     User.associate = function(models) {
//       User.belongsToMany(models.Organisation, {
//         through: 'UserOrganisation',
//         foreignKey: 'UserId'
//       });
//     };
  
//     return User;
//   };
  