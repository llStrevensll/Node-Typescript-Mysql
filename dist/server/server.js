"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
class Server {
    constructor(puerto) {
        this.port = puerto;
        this.app = express();
    }
    //static init-> tener solo una instancia de express corriendo
    //inicializara al llamar el constructor 
    static init(puerto) {
        return new Server(puerto);
    }
    publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }
    start(callback) {
        this.app.listen(this.port, callback());
        this.publicFolder();
    }
}
exports.default = Server;
