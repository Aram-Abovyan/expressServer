'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleAssignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
      this.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
      })
    }
  }
  RoleAssignment.init({}, {
    sequelize,
    modelName: 'RoleAssignment',
    tableName: 'role_assignment'
  });
  return RoleAssignment;
};