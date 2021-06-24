const Sequelize = require('sequelize');

const sequelize = new Sequelize('bases2', 'docker', 'docker', {
    host: '172.23.0.3',
    port: 3306,
    dialect: 'mysql'
});

module.exports.connect = sequelize;