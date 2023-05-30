const express = require('express');
const router = express.Router();

const {
  addUser,
  getUserId,
  getAllUser,
} = require('../controllers/userController');

router.post('/add-user', addUser);
router.get('/get-user-id', getUserId);
router.get('/get-all-user', getAllUser);

module.exports = {
  routes: router,
};
