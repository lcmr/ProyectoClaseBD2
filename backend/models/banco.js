const Connection = require("../dbconfig");
const { DataTypes } = require("sequelize");

const dbConnection = Connection.connect;

const Banco = dbConnection.define(
    "banco", {
        idBanco: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports.createBanco = function(nombre) {
    Banco.create({ nombre }).then(
        (data) => {
            console.log(data.toJSON());
        }
    );
};
module.exports.findAll = function() {
    return Banco.findAll();
};