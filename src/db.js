const { Pool } = require('pg');
const { db, dbLocal } = require('./config')

const local = false;

// const pool = new Pool({
//     user:     local ? dbLocal.user     : db.user,
//     password: local ? dbLocal.password : db.password,
//     host:     local ? dbLocal.host     : db.host,
//     port:     local ? dbLocal.port     : db.port,
//     database: local ? dbLocal.database : db.database,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});


module.exports = pool;