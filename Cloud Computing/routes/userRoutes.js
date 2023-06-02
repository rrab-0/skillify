const express = require('express');
const router = express.Router();

const {
  addUser,
  getUserId,
  getAllUser,
  deleteUser,
} = require('../controllers/userController');

router.post('/add-user', addUser);
router.get('/get-user-id/:id', getUserId);
router.get('/get-all-user', getAllUser);
router.delete('/delete-user/:id', deleteUser);

module.exports = {
  routes: router,
};
