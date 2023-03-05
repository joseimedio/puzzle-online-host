const { Router } = require('express');
const { getPuzzle, createPuzzle, createUser, insertPieces, deletePuzzle, deleteUser, updatePiece } = require('../controllers/tasks.controllers')

const router = Router();

router.get('/puzzles/:id', getPuzzle);

router.post('/puzzles', createPuzzle);

router.post('/users', createUser);

router.post('/pieces', insertPieces);

router.delete('/puzzles', deletePuzzle);

router.delete('/users', deleteUser);

router.put('/pieces', updatePiece);

module.exports = router;