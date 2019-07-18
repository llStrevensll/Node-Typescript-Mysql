import mysql = require('mysql');
//Patron Singleton:
//Evitar multiples instancias o cadenas de conexiones corriendo - conexiones abiertas

export default class MySQL {
    private static _instance: MySQL;

    cnn: mysql.Connection;
    conectado: boolean = false;


    constructor(){
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
    public static get instance(){
        return this._instance || (this._instance = new this())//sino existe la instancia la crea
    }

    static ejecutarQuery(query: string, callback: Function){
        this.instance.cnn.query(query, (err, results: Object[], fields)=> {

            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }

            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }else{
                callback(null, results);
            }
        });
    }

    private conectarDB(){
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            }
        });

        this.conectado = true;
        console.log('Base de datos online!');
        
    }
}