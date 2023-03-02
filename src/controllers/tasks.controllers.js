const pool = require('../db');

const getAllTasks = async (req, res, next) => {
    try {
        const allTasks = await pool.query('SELECT * FROM puzzle_1')
        res.json(allTasks.rows)
    } catch (err){
        next(err);
    }
};

const getTask = async (req, res) => {
    res.send('Retrieving a single task')
};

const createTask = async (req, res, next) => {
    const { url, dimensions, current_location, true_location } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO puzzle_1 (url, dimensions, current_location, true_location) VALUES ($1, $2, $3, $4) RETURNING *', 
            [url, dimensions, current_location, true_location]
        );

        res.json(result.rows[0])
    } catch (err) {
        next(err);
    }
};

const deleteTask = async (req, res) => {
    res.send('Removing a task')
};

const updateTask = async (req, res, next) => {
    const { id, current_location } = req.body;

    try {
        const result = await pool.query(
            'UPDATE puzzle_1 SET current_location=$1 WHERE id=$2 RETURNING *', 
            [current_location, id]
        );

        res.json(result.rows[0])
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
};