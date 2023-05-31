const express = require('express');
const router = express.Router();

const { addJob } = require('../controllers/jobController');

router.post('/add-job', addJob);

module.exports = {
  routes: router,
};
