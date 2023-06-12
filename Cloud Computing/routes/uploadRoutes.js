const express = require('express');
const router = express.Router();
const multer = require('multer');

const { uploadFile } = require('../controllers/uploadController');
const { authenticateToken } = require('../controllers/userController');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authenticateToken, upload.single('filename'), uploadFile);

module.exports = {
  routes: router,
};
