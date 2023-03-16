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
    dbHeroku: {
        user: process.env.DB_USER_HEROKU,
        password: process.env.DB_PASSWORD_HEROKU,
        host: process.env.DB_HOST_HEROKU, 
        port: process.env.DB_PORT_HEROKU,
        database: process.env.DB_DATABASE_HEROKU 
    }
}