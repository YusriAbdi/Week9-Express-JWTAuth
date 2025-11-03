const express = require('express');
const router = express.Router();
const obatController = require('../controllers/obatController');
const validateObat = require("../middleware/obatValidate");
// Tambahkan middleware auth
const authenticateToken = require("../middleware/authMiddleware");

// GET all obat
router.get('/', authenticateToken, obatController.getAllObat);

// GET obat by ID
router.get('/:id', authenticateToken, obatController.getObatById);

// POST create obat
router.post('/', authenticateToken, validateObat, obatController.addObat);

// PUT update obat
router.put('/:id', authenticateToken, validateObat, obatController.updateObat);

// DELETE obat
router.delete('/:id', authenticateToken, obatController.deleteObat);

module.exports = router;