const express = require("express"); 
const {
    createTodoItemTable,  
    createItem,          
    showItems,           
    updateItem,          
    deleteItem           
} = require("../controllers/todoItems"); 

const router = express.Router(); 

// Define routes

// Route to create the 'todoItems' table
router.get('/create/todoItemTable', createTodoItemTable);

// Route to create a new todo item associated with a specific list ID
router.post('/addItem/:id', createItem);

// Route to retrieve todo items by list ID
router.get('/get/todoItems/:id', showItems);

// Route to update a todo item by its ID
router.put('/updateItem/:id', updateItem);

// Route to delete a todo item by its ID
router.delete('/deleteItem/:id', deleteItem);

module.exports = router;