const express = require('express');
const router = express.Router();
const {getTareas,createTareas,updateTareas,deleteTareas,} = require('../controllers/tareasControllers.js');

const protect = require('../middleware/authMiddleware.js')

router.get('/', protect, getTareas)
router.post('/', protect, createTareas)

router.put('/:id', updateTareas)
router.delete('/:id', deleteTareas)

module.exports = router