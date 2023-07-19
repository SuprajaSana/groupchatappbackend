const Sequelize = require("sequelize");

const sequelize = new Sequelize("groupchatapp","root","Saana@123",
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
