const express = require('express');
const router = express.Router();
const multer = require('multer');

const { uploadFile } = require('../controllers/uploadController');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('filename'), uploadFile);

module.exports = {
  routes: router,
};
