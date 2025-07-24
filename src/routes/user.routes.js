const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.post('/user', verifyToken, userController.createUser);
router.get('/user/list', verifyToken, userController.getAllUserList);

module.exports = router;