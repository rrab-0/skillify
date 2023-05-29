const express = require('express');
const router = express.Router();

const { addUser, getUserById } = require('../controllers/userController');

router.post('/add-user', addUser);
// router.get('/get-user', getUserById);

module.exports = {
  routes: router,
};
