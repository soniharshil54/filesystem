const mysql = require("mysql")
const Config = require("./constant/config")
let config = new Config()

// Create connection
const db = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database,
    port: config.db_port
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

module.exports = db