/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE pieces (
            abs_id SERIAL PRIMARY KEY,
            local_id INTEGER NOT NULL,
            img_src VARCHAR NOT NULL,
            img_src_extra VARCHAR,
            piece_dimensions POINT NOT NULL,
            current_location POINT NOT NULL,
            true_location POINT NOT NULL,
            puzzle_id INTEGER NOT NULL REFERENCES puzzles(pzz_id) ON DELETE CASCADE 
        );
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE pieces;
    `)
};
