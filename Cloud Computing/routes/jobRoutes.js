const express = require('express');
const router = express.Router();

const {
  addJob,
  getJobId,
  getAllJobOfOneUser,
} = require('../controllers/jobController');

router.post('/add-job', addJob);
router.get('/get-job-id/:id', getJobId);
router.get('/get-all-jobs-for-a-user', getAllJobOfOneUser);

module.exports = {
  routes: router,
};
