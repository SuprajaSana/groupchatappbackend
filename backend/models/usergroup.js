const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const UserGrp = sequelize.define("usergroup", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  isAdmin:Sequelize.BOOLEAN
});

module.exports = UserGrp;
