const express = require("express");
const {
    createTable,
    createList,
    showList,         
    showSingleList,    
    updateRecord,      
    deleteRecord       
} = require("../controllers/todoController"); 
const router = express.Router(); 

// Define routes

// Route to create the 'todo' table
router.get('/create/todotable', createTable);

// Route to create a new todo list
router.post('/add/:id', createList);

// Route to retrieve all todo lists
router.get('/get/todolist', showList);

// Route to retrieve a single todo list by ID
router.get('/get/todo/:id', showSingleList);

// Route to update a todo list by ID
router.put('/updatelist/:id', updateRecord);

// Route to delete a todo list by ID
router.delete('/deletelist/:id', deleteRecord);

module.exports = router; 