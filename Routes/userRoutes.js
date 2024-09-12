const express = require('express');
const { getAllUsers, createUser, loginUser } = require('../Controllers/users_controller');
const validateToken = require('../Utils/validate_token');

const router = express.Router();

router.get('/', validateToken, getAllUsers);
router.post('/', validateToken, createUser);
router.post('/login', loginUser);

module.exports = router;