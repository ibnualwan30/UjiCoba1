// src/routes/detection.js - Detection API Routes
const express = require('express');
const router = express.Router();
const detectionController = require('../controllers/detectionController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

// Route untuk upload dan deteksi gambar
router.post('/analyze', uploadMiddleware, detectionController.analyzeImage);

module.exports = router;