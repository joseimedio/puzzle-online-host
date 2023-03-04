/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE puzzle_1 (
            id SERIAL PRIMARY KEY,
            url VARCHAR(400) UNIQUE NOT NULL,
            dimensions POINT NOT NULL,
            current_location POINT NOT NULL,
            true_location POINT NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP  
        );
    `)
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE puzzle_1;
    `);
};
