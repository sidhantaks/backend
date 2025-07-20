const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.postUser); // Create user
router.get('/', userController.getUsers); // Read all users    
router.get('/:id', userController.getUserById); // Read one user
router.put('/:id', userController.updateUser); // Update user      
router.delete('/:id', userController.deleteUser); // Delete user

router.post('/login', userController.loginUser); // user login

module.exports = router;