const express = require('express');
const {
    createUserTable,    
    createUserList,    
    showUserList,     
    showSingleUser,   
    updateUserRecord,  
    deleteUserRecord   
} = require('../controllers/user'); 
const router = express.Router();

// Route to create the 'user' table
router.get('/create/usertable', createUserTable);

// Route to create a new user
router.post('/create/user', createUserList);

// Route to retrieve all users
router.get('/get/user', showUserList);

// Route to retrieve a single user by ID
router.get('/get/user/:id', showSingleUser);

// Route to update a user's information by ID
router.put('/updateuser/:id', updateUserRecord);

// Route to delete a user by ID
router.delete('/deleteuser/:id', deleteUserRecord);

module.exports = router;
