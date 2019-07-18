"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
//Patron Singleton:
//Evitar multiples instancias o cadenas de conexiones corriendo - conexiones abiertas
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '12345',
            database: 'node_bd'
        });
        this.conectarDB();
    }
    //Revisar si tiene una instancia 
    static get instance() {
        return this._instance || (this._instance = new this()); //sino existe la instancia la crea
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
        });
        this.conectado = true;
        console.log('Base de datos online!');
    }
}
exports.default = MySQL;
