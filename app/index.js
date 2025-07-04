// const validator = require('express-validator');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const flash = require('connect-flash');
// const passport = require('passport');
// const Helpers = require('./helpers');
// const methodOverride = require('method-override');
// const csrfErrorHandler = require('app/http/middleware/csrfErrorHandler');
// const rememberLogin = require('app/http/middleware/rememberLogin');
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
    //     require('app/passport/passport-local');
 
    //     app.enable('trust proxy'); 
        app.use(helmet());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    //     app.use(express.static(config.layout.public_dir));
    //     app.set('view engine', config.layout.view_engine);
    //     app.set('views' , config.layout.view_dir);
    //     app.use(config.layout.ejs.expressLayouts);
    //     app.set("layout extractScripts", config.layout.ejs.extractScripts);
    //     app.set("layout extractStyles", config.layout.ejs.extractStyles);
    //     app.set("layout" , config.layout.ejs.master);


        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended : true }));
    //     app.use(methodOverride('_method'));
    //     app.use(validator());
    //     app.use(session({...config.session}));
        app.use(cookieParser(config.get("cookie_secretkey")));
    //     app.use(flash());
    //     app.use(passport.initialize());
    //     app.use(passport.session());
    //     app.use(rememberLogin.handle);

    //     app.use((req , res , next) => {
    //         app.locals = new Helpers(req, res).getObjects();
    //         next();
    //     });
    }

    setRouters() {
        csrf({ cookie : true }) 
        app.use(router)
        // app.use(csrfErrorHandler.handle);
    }
}