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
    userId = req.params.id;

    try {
        const userInfo = await pool.query(`
            SELECT *
            FROM puzzles
            INNER JOIN users
                ON user_id = users.id
            WHERE user_id=${userId}
            ORDER BY pzz_id;
            `);
        const allPuzzles = await pool.query(`
            SELECT * 
            FROM pieces 
            INNER JOIN puzzles 
                ON puzzle_id=puzzles.pzz_id 
            WHERE user_id=${userId}
            ORDER BY abs_id;
             `);
        res.json({info:userInfo.rows, puzzles:allPuzzles.rows})
    } catch (err){
        next(err);
    }
};

const getPuzzle = async (req, res, next) => {
    puzzleId = req.params.id;

    try {
        const puzzleInfo = await pool.query('SELECT * FROM puzzles WHERE pzz_id=$1', [puzzleId]);
        const allPieces = await pool.query('SELECT * FROM pieces WHERE puzzle_id=$1 ORDER BY abs_id', [puzzleId]);
        res.json({info:puzzleInfo.rows, pieces:allPieces.rows})
    } catch (err){
        next(err);
    }
};

const createPuzzle = async (req, res, next) => {
    const { name, dimensions, numCols, numRows, userId } = req.body;

    try {
        const result = await pool.query(
            `
            INSERT INTO puzzles (name, puzzle_dimensions, num_cols, num_rows, user_id)
            VALUES
                ('${name}', '(${dimensions.x}, ${dimensions.y})', 
                '${numCols}', '${numRows}', '${userId}')
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
    console.log(localId, imgSrc, dimensions, currentLoc, trueLoc, puzzleId);

    try {
        const result = await pool.query(
            `
                INSERT INTO pieces (local_id, img_src, piece_dimensions, 
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
            'DELETE FROM puzzles WHERE pzz_id = $1 RETURNING *', [puzzleId]
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

const updatePuzzle = async (req, res, next) => {
    const { puzzleId, completionPercent } = req.body;

    try {
        const result = await pool.query(
            'UPDATE puzzles SET completion_percent=$1, updated_at = CURRENT_TIMESTAMP WHERE id=$2 RETURNING *', 
            [completionPercent, puzzleId]
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
    updatePuzzle,
    updatePieceCreate,
    updatePiece
};