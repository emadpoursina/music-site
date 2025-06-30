// require('app-module-path').addPath(__dirname)
import App from "./app/index.js"
import dotenv from "dotenv"
import config from "./config/index.js"

global.config = config
dotenv.config()

new App();