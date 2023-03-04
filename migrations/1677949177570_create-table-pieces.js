/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE pieces (
            id SERIAL PRIMARY KEY,
            local_id INTEGER NOT NULL,
            img_src VARCHAR(1) NOT NULL,
            dimensions POINT NOT NULL,
            current_location POINT NOT NULL,
            true_location POINT NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            puzzle_id INTEGER NOT NULL REFERENCES puzzles(id) ON DELETE CASCADE 
        );
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE pieces;
    `)
};