import database from './database.js'
// const session = require('./session');
// const layout = require('./layout');
// const service = require('./service');

export default {
    database,
    // session,
    // layout,
    // service,
    port : process.env.APPLICATION_PORT || 3000,
    cookie_secretkey : process.env.COOKIE_SECRETKEY || "ksdljf8w3f9",
    // debug : true,
    // siteurl : process.env.WEBSITE_URL,
    // jwt : {
    //     secret_key : 'fgsdget#r%!@#$qeg'
    // }
}