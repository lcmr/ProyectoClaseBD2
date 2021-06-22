const Sequelize = require('sequelize');

const sequelize = new Sequelize('bases2', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

module.exports.connect = sequelize;