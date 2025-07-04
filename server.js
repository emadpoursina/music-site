// require('app-module-path').addPath(__dirname)
import App from "./app/index.js"
import config from "config"

if (!config.get("cookie_secretkey")) {
    console.error('No Cookie Secret key');
    process.exit(1);
}

new App();