/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            pass VARCHAR(8) NOT NULL,
            joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        INSERT INTO users (username, pass)
        VALUES
            ('test1', '12345678');
    `)
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE users;
    `);
};
