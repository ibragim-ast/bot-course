const { Sequelize } = require("sequelize");

module.exports = new Sequelize("telega_bot", "root", "root", {
  host: "82.202.198.245",
  port: "5432",
  dialect: "postgres",
});
