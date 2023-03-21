/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            pass VARCHAR(200) NOT NULL,
            email VARCHAR(200),
            joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE users;
    `);
};
