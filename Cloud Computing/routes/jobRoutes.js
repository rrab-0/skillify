const express = require('express');
const router = express.Router();

const {
  addJob,
  getJobId,
  getAllJobOfOneUser,
  deleteJob,
  deleteAllJobOfOneUser,
  updateJob,
} = require('../controllers/jobController');

const {
  authenticateToken,
} = require('../controllers/userController');

router.post('/add-job', authenticateToken, addJob);
router.get('/get-job-id/:id', authenticateToken, getJobId);
router.get('/get-all-jobs-for-a-user', authenticateToken, getAllJobOfOneUser);
router.patch('/update-job/:id', authenticateToken, updateJob);
router.delete('/delete-job/:id', authenticateToken, deleteJob);
router.delete('/delete-all-jobs-for-a-user', authenticateToken, deleteAllJobOfOneUser);

module.exports = {
  routes: router,
};
