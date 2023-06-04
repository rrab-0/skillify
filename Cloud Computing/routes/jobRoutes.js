const express = require('express');
const router = express.Router();

const {
  addJob,
  getJobId,
  getAllJobOfOneUser,
  deleteJob,
  deleteAllJobOfOneUser,
} = require('../controllers/jobController');

router.post('/add-job', addJob);
router.get('/get-job-id/:id', getJobId);
router.get('/get-all-jobs-for-a-user', getAllJobOfOneUser);
router.delete('/delete-job/:id', deleteJob);
router.delete('/delete-all-jobs-for-a-user', deleteAllJobOfOneUser);

module.exports = {
  routes: router,
};
