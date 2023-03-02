/* eslint-disable camelcase */

exports.shorthands = undefined;

const k = 0.5;
const height = 200*k;
const width = 234*k;
const urls= [
    'https://i.ibb.co/89hjgJr/image-part-001.jpg',
    'https://i.ibb.co/j8JW5QM/image-part-002.jpg',
    'https://i.ibb.co/TwZXM2x/image-part-003.jpg',
    'https://i.ibb.co/0J1RKnb/image-part-004.jpg',
    'https://i.ibb.co/q7pMvwR/image-part-005.jpg',
    'https://i.ibb.co/9bjgqB9/image-part-006.jpg',
    'https://i.ibb.co/jf45JKv/image-part-007.jpg',
    'https://i.ibb.co/nsGnw05/image-part-008.jpg',
    'https://i.ibb.co/yktdmvb/image-part-009.jpg',
    'https://i.ibb.co/P44BcmM/image-part-010.jpg'
];


exports.up = pgm => {
    pgm.sql(`
        INSERT INTO puzzle_1 (url, dimensions, current_location, true_location)
        VALUES
            ('${urls[0]}', '(${width},${height})', '(${0*width},${0*height})', '(${0*width},${0*height})'),
            ('${urls[1]}', '(${width},${height})', '(${1*width},${0*height})', '(${1*width},${0*height})'),
            ('${urls[2]}', '(${width},${height})', '(${2*width},${0*height})', '(${2*width},${0*height})'),
            ('${urls[3]}', '(${width},${height})', '(${3*width},${0*height})', '(${3*width},${0*height})'),
            ('${urls[4]}', '(${width},${height})', '(${4*width},${0*height})', '(${4*width},${0*height})'),
            ('${urls[5]}', '(${width},${height})', '(${0*width},${1*height})', '(${0*width},${1*height})'),
            ('${urls[6]}', '(${width},${height})', '(${1*width},${1*height})', '(${1*width},${1*height})'),
            ('${urls[7]}', '(${width},${height})', '(${2*width},${1*height})', '(${2*width},${1*height})'),
            ('${urls[8]}', '(${width},${height})', '(${3*width},${1*height})', '(${3*width},${1*height})'),
            ('${urls[9]}', '(${width},${height})', '(${4*width},${1*height})', '(${4*width},${1*height})')
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DELETE FROM puzzle_1;
    `);
};
