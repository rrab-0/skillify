// setup
const express = require('express');
const router = express.Router();
const multer = require('multer');

const { uploadFile } = require('../controllers/uploadController');
const { authenticateToken } = require('../controllers/userController');
const upload = multer({ storage: multer.memoryStorage() });

// route for uploading files (we use it to store profile photos of users/companies)
router.post('/', authenticateToken, upload.single('filename'), uploadFile);

module.exports = {
  routes: router,
};
