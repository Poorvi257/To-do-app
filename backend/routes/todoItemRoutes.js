const app = require("express");
const { createTodoItemTable, createItem, showItems, updateItem, deleteItem } = require("../controllers/todoItems");
const router = app.Router()


router.get('/create/todoItemTable', createTodoItemTable)
router.post('/addItem/:id', createItem)
router.get('/get/todoItems/:id', showItems)
router.put('/updateItem/:id', updateItem)
router.delete('/deleteItem/:id', deleteItem)

module.exports = router