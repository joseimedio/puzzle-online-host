/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE puzzles (
            pzz_id SERIAL PRIMARY KEY,
            name VARCHAR (200) NOT NULL,
            puzzle_dimensions POINT NOT NULL,
            num_cols INTEGER NOT NULL,
            num_rows INTEGER NOT NULL,        
            completion_percent INTEGER DEFAULT 100,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
        );
    `)
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE puzzles;
    `);
};