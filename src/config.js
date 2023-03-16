const { config } = require('dotenv');
config();

module.exports = {
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST, 
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE 
    },
    dbLocal: {
        user: process.env.DB_USER_LOCAL,
        password: process.env.DB_PASSWORD_LOCAL,
        host: process.env.DB_HOST_LOCAL, 
        port: process.env.DB_PORT_LOCAL,
        database: process.env.DB_DATABASE_LOCAL  
    }
}