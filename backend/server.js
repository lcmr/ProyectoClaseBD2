"use strict";

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const path = require("path");
const Connection = require("./dbconfig");
const DetalleFinanciero = require("./models/detalleFinanciero");
const Bancos = require("./models/Banco");
const { QueryTypes, Sequelize } = require("sequelize");


const init = async() => {
    const server = Hapi.Server({
        host: "localhost",
        port: 3000,
        routes: {
            files: {
                relativeTo: path.join(__dirname, "static"),
            },
        },
    });

    await server.register([{
            plugin: require("hapi-geo-locate"),
            options: {
                enabledByDefault: true,
            },
        },
        {
            plugin: Inert,
        },
        {
            plugin: require("@hapi/vision"),
        },
    ]);

    server.views({
        engines: {
            hbs: require("handlebars"),
        },
        path: path.join(__dirname, "views"),
        layout: "default",
    });

    server.route([{
            method: "GET",
            path: "/",
            handler: (request, h) => {
                return h.file("welcome.html");
            },
        },
        {
            method: "GET",
            path: "/getBancos",
            handler: async(request, h) => {
                const bancos = await Bancos.findAll();
                return bancos;
            },
        },
        {
            method: "POST",
            path: "/postBanco",
            handler: async(request, h) => {
                Bancos.createBanco(request.payload.nombre);
                return await Bancos.findAll();
            },
        },
        {
            method: "GET",
            path: "/getDetalleFinanciero",
            handler: async(request, h) => {
                const detalleFinanciero = await DetalleFinanciero.findAll();
                return detalleFinanciero;
            },
        },
        {
            method: "GET",
            path: "/getRanking",
            handler: async(request, h) => {
                const con = Connection.connect;
                const results = await con.query(
                    "select * from rankingBancos;", { type: QueryTypes.SELECT }
                );
                return results;
            },
        },

        {
            method: "POST",
            path: "/postDetalleFinanciero",
            handler: async(request, h) => {
                DetalleFinanciero.createDetalleFinanciero(
                    request.payload.Activo,
                    request.payload.Pasivo,
                    request.payload.Capital,
                    request.payload.fecha,
                    request.payload.idBanco
                );
                const detalleFinanciero = await DetalleFinanciero.findAll();
                return detalleFinanciero;
            },
        },
        {
            method: "POST",
            path: "/login",
            handler: (request, h) => {
                DetalleFinanciero.createUser(
                    request.payload.username,
                    request.payload.password
                );
                return h.view("index", { username: request.payload.username });
            },
        },
        {
            method: "GET",
            path: "/{any*}",
            handler: (request, h) => {
                return "<h1>Oh no! You must be lost!</h1>";
            },
        },
    ]);

    await server.start();
    console.log(`Server started on: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();