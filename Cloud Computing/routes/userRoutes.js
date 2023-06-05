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
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/add-user-data/:id', addUserData);
router.get('/get-user-data-by-id/:id', getUserDataById);
router.get('/get-all-user', getAllUsersData);
router.patch('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

module.exports = {
  routes: router,
};
