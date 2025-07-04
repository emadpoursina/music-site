import express from "express"
import http from 'http'
import helmet from "helmet"
import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import mongoose from 'mongoose'
import router from './routes/web/index.js'
import bodyParser from 'body-parser'
import config from "config"

const app = express();

export default class Application {
    constructor() {
        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setRouters();
    }


    setupExpress() {
        const server = http.createServer(app);
        server.listen(config.get("port") , () => console.log(`Listening on port ${config.get("port")}`));
    }

    setMongoConnection() {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.get("database.url"))
        .then(() => console.log(`Connected to database`))
        .catch((err) => console.log('error in connecting to database', err.message));
    }

    /**
     * Express Config
     */
    setConfig() {
        app.use(helmet());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended : true }));
        app.use(cookieParser(config.get("cookie_secretkey")));
    }

    setRouters() {
        csrf({ cookie : true }) 
        app.use(router)
    }
}