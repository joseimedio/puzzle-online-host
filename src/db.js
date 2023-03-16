const { Pool } = require('pg');
const { db, dbHeroku } = require('./config')

const poolLocal = new Pool({
    user:     db.user,
    password: db.password,
    host:     db.host,
    port:     db.port,
    database: db.database
});

const poolLocalToHeroku = new Pool({
    user:     dbHeroku.user,
    password: dbHeroku.password,
    host:     dbHeroku.host,
    port:     dbHeroku.port,
    database: dbHeroku.database,
    ssl: {
        rejectUnauthorized: false
    }
});

const connectionString = process.env.DATABASE_URL;
const poolHeroku = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const pool = connectionString 
            ? poolHeroku 
            : poolLocalToHeroku;


module.exports = pool;