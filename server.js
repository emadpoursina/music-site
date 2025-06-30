// require('app-module-path').addPath(__dirname)
import App from "./app/index.js"
// require('dotenv').config();
import config from "./config/index.js"
global.config = config

new App();