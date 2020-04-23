const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db_test');

const User = conn.define('user', {
  name: STRING 
});

module.exports = {
  User,
  conn
};
