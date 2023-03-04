/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE puzzles (
            id SERIAL PRIMARY KEY,
            original_image_url VARCHAR(400) NOT NULL,
            num_cols INTEGER NOT NULL,
            num_rows INTEGER NOT NULL,        
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