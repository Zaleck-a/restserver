const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usersPath = '/api/users'
        //Conecrar a DB
        this.conectDB();
        //Middlewares
        this.middlewares();
        //Rutas
        this.routes();
    }

    async conectDB(){
        await dbConection();
    }

    middlewares(){
        //cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public'));
    }

    routes(){
        
        this.app.use(this.usersPath, require('../routes/users'));
    }

    listen(){
        this.app.listen( this.port , () => {
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }
}

module.exports = Server;