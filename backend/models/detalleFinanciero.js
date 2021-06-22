const Connection = require("../dbconfig");
const { DataTypes } = require("sequelize");

const dbConnection = Connection.connect;

const DetalleFinanciero = dbConnection.define(
    "detallefinanciero", {
        idDetalleFinanciero: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Activo: {
            type: DataTypes.DECIMAL,
        },
        Pasivo: {
            type: DataTypes.DECIMAL,
        },
        Capital: {
            type: DataTypes.DECIMAL,
        },
        fecha: {
            type: DataTypes.DATE,
        },
        idBanco: {
            type: DataTypes.INTEGER,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports.createDetalleFinanciero = function(
    Activo,
    Pasivo,
    Capital,
    fecha,
    idBanco
) {
    DetalleFinanciero.create({ Activo, Pasivo, Capital, fecha, idBanco }).then(
        (data) => {
            console.log(data.toJSON());
        }
    );
};
module.exports.findAll = function() {
    return DetalleFinanciero.findAll();
};