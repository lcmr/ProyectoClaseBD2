"use strict";

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const path = require("path");
const Connection = require("./dbconfig");
const DetalleFinanciero = require("./models/detalleFinanciero");
const Bancos = require("./models/banco");
const { QueryTypes, Sequelize } = require("sequelize");
var tratamientos = require("./handlers/preResponseHandler");
const Usuarios = require("./models/usuario");

const init = async() => {
    const server = Hapi.Server({
        host: "localhost",
        port: 5000,
        routes: {
            files: {
                relativeTo: path.join(__dirname, "static"),
            },
            cors: {
                origin: ["http://localhost:3000"],
                headers: ["Accept", "Content-Type"],
                additionalHeaders: ["X-Requested-With"]
            }
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
        {
            plugin: require("@hapi/cookie"),
        },
    ]);

    server.auth.strategy("login", "cookie", {
        cookie: {
            name: "session",
            password: "1cursodebasesdedatosdosjunio2021",
            isSecure: false,
        },
        redirectTo: "/",
        validateFunc: async(request, session) => {
            if (
                (session.valid)
            ) {
                return { valid: true };
            } else {
                return { valid: false };
            }
        },
    });

    server.auth.default("login");
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
            options: {
                auth: {
                    mode: "try",
                },
            },
        },
        {
            method: "GET",
            path: "/getUsers",
            handler: async(request, h) => {
                return await Usuarios.findAll();
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
                const detalleFinancieros = await DetalleFinanciero.findAll();
                return detalleFinancieros;
            },
        },
        {
            method: "GET",
            path: "/getRanking",
            handler: async(request, h) => {
                const con = Connection.connect;
                const results = await con.query("select * from rankingBancos;", {
                    type: QueryTypes.SELECT,
                });
                const bancos = await Bancos.findAll();
                tratamientos.formateo(results, bancos);
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
            handler: async(request, h) => {

                const algo = await Usuarios.uno(request.payload.nombreUsuario, request.payload.password);
                if (algo != null) {
                    request.cookieAuth.set({
                        valid: true
                    });
                    return h.redirect("/welcome");
                } else {
                    return h.redirect("/");
                }
            },
            options: {
                auth: {
                    mode: "try",
                },
            },
        },
        {
            method: "GET",
            path: "/logout",
            handler: (request, h) => {
                request.cookieAuth.clear();
                return h.redirect("/");
            },
            options: {
                auth: {
                    mode: "try",
                },
            },
        },
        {
            method: "GET",
            path: "/welcome",
            handler: (request, h) => {
                return h.file("logged-in.html");
            },
            options: {
                auth: {
                    mode: "try",
                },
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