const { Router } = require('express');
const { testConnection, getUsers, getUserInfo, getPuzzle, createPuzzle, createUser, insertPieces, deletePuzzle, deleteUser, updatePuzzle, updatePieceCreate, updatePiece } = require('../controllers/tasks.controllers')

const router = Router();

router.get('/', testConnection);

router.get('/users', getUsers);

router.get('/users/:id', getUserInfo);

router.get('/puzzles/:id', getPuzzle);

router.post('/puzzles', createPuzzle);

router.post('/users', createUser);

router.post('/pieces', insertPieces);

router.delete('/puzzles', deletePuzzle);

router.delete('/users', deleteUser);

router.put('/puzzles/create', updatePuzzle);

router.put('/pieces/create', updatePieceCreate);

router.put('/pieces', updatePiece);

module.exports = router;