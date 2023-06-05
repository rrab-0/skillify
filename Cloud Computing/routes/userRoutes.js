const express = require('express');
const router = express.Router();

const {
  addUserData,
  getUserDataById,
  getAllUsersData,
  deleteUser,
  registerUser,
  loginUser,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/add-user-data/:id', addUserData);
router.get('/get-user-data-by-id/:id', getUserDataById);
router.get('/get-all-user', getAllUsersData);
router.delete('/delete-user/:id', deleteUser);

module.exports = {
  routes: router,
};
