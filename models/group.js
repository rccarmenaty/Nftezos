"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: "group_user",
        onDelete: "CASCADE",
      });
    }
  }
  Group.init(
    {
      name: { type: DataTypes.STRING, unique: true },
      description: DataTypes.STRING,
      owner: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
