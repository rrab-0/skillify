// setup
const express = require('express');
const router = express.Router();

const {
  addUserData,
  getUserDataById,
  getAllUsersData,
  deleteUser,
  registerUser,
  loginUser,
  updateUser,
  authenticateToken,
} = require('../controllers/userController');

// routes available for user
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/add-user-data/:id', authenticateToken, addUserData);
router.get('/get-user-data-by-id/:id', authenticateToken, getUserDataById);
router.get('/get-all-user', authenticateToken, getAllUsersData);
router.patch('/update-user/:id', authenticateToken, updateUser);
router.delete('/delete-user/:id', authenticateToken, deleteUser);

module.exports = {
  routes: router,
};
