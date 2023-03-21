const pool = require('../db');

const testConnection = async (req, res, next) => {
    try {
        res.send(process.env.DATABASE_URL || "Connected")
    } catch (err){
        next(err);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const userList = await pool.query('SELECT * FROM users;');
        res.json(userList.rows)
    } catch (err){
        next(err);
    }
};

const getUserInfo = async (req, res, next) => {
    user_id = req.params.id;

    try {
        const userInfo = await pool.query('SELECT * FROM users WHERE id=$1', [user_id]);
        const allPuzzles = await pool.query('SELECT * FROM puzzles WHERE user_id=$1', [user_id]);
        res.json({info:userInfo.rows, puzzles:allPuzzles.rows})
    } catch (err){
        next(err);
    }
};

const getPuzzle = async (req, res, next) => {
    puzzle_id = req.params.id;

    try {
        const puzzleInfo = await pool.query('SELECT * FROM puzzles WHERE id=$1', [puzzle_id]);
        const allPieces = await pool.query('SELECT * FROM pieces WHERE puzzle_id=$1', [puzzle_id]);
        res.json({info:puzzleInfo.rows, pieces:allPieces.rows})
    } catch (err){
        next(err);
    }
};

const createPuzzle = async (req, res, next) => {
    const { name, numCols, numRows, userId } = req.body;

    try {
        const result = await pool.query(
            `
            INSERT INTO puzzles (name, num_cols, num_rows, user_id)
            VALUES
                ('${name}', '${numCols}', '${numRows}', '${userId}')
            RETURNING *;
            `
        );

        res.json(result.rows[0])
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    const { username, pass, email } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO users (username, pass, email) VALUES ($1, $2, $3)', [username, pass, email]
        );

        res.json(result.rows[0])
    } catch (err) {
        next(err);
    }
};

const insertPieces = async (req, res, next) => {
    const { localId, imgSrc, dimensions, currentLoc, trueLoc, puzzleId } = req.body;

    try {
        const result = await pool.query(
            `
                INSERT INTO pieces (local_id, img_src, dimensions, 
                                        current_location, true_location, puzzle_id)
                VALUES 
                    ('${localId}', '${imgSrc}', '(${dimensions.x}, ${dimensions.y})', 
                    '(${currentLoc.x}, ${currentLoc.y})', '(${trueLoc.x},${trueLoc.y})', '${puzzleId}')
                RETURNING *;
            `
        );

        res.json(result.rows[0])
    } catch (err) {
        next(err);
    }
};

const deletePuzzle = async (req, res, next) => {
    const { puzzleId } = req.body;

    try {
        const result = await pool.query(
            'DELETE FROM puzzles WHERE id = $1 RETURNING *', [puzzleId]
        );

        res.json(result.rows[0])
    } catch (err) {
        next(err);
    }   
};

const deleteUser = async (req, res, next) => {
    const { userId } = req.body;

    try {
        const result = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *', [userId]
        );

        res.json(result.rows[0])
    } catch (err) {
        next(err);
    }   
};

const updatePuzzleCreate = async (req, res, next) => {
    const { puzzleId, imgSrc, imgSrcExtra } = req.body;

    try {
        const result = await pool.query(
            'UPDATE puzzles SET img_src=$1, img_src_extra=$2 WHERE id=$3 RETURNING *', 
            [imgSrc, imgSrcExtra, puzzleId]
        );

        res.json(result.rows[0])
    } catch (err) {
        next(err);
    }
};

const updatePieceCreate = async (req, res, next) => {
    const { localId, imgSrcExtra, puzzleId } = req.body;

    try {
        const result = await pool.query(
            'UPDATE pieces SET img_src_extra=$1 WHERE puzzle_id=$2 AND local_id=$3 RETURNING *', 
            [imgSrcExtra, puzzleId, localId]
        );

        res.json(result.rows[0])
    } catch (err) {
        next(err);
    }
};

const updatePiece = async (req, res, next) => {
    const { puzzleId, pieceId, currentLocation } = req.body;

    try {
        const result = await pool.query(
            'UPDATE pieces SET current_location=$1 WHERE puzzle_id=$2 AND local_id=$3 RETURNING *', 
            [currentLocation, puzzleId, pieceId]
        );

        res.json(result.rows[0])
    } catch (err) {
        next(err);
    }
};

module.exports = {
    testConnection,
    getUsers,
    getUserInfo,
    getPuzzle,
    createPuzzle,
    createUser,
    insertPieces,
    deletePuzzle,
    deleteUser,
    updatePuzzleCreate,
    updatePieceCreate,
    updatePiece
};