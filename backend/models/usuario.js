const Connection = require("../dbconfig");
const { DataTypes } = require("sequelize");

const dbConnection = Connection.connect;

const Usuarios = dbConnection.define(
    "usuario", {
        idUsuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombreUsuario: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports.createUser = function(nombreUsuario, password) {
    Usuarios.create({ nombreUsuario, password }).then((data) => {
        console.log(data.toJSON());
    });
}
module.exports.findAll = function() {
    return Usuarios.findAll();
}
module.exports.uno = async function(username, pass) {
    return Usuarios.findOne({ where: { nombreUsuario: username, password: pass } });
}