const app = require("express");
const { createTable, createList, showList, showSingleList, updateRecord, deleteRecord } = require("../controllers/todoController");
const router = app.Router()


router.get('/create/todotable', createTable)
router.post('/add/:id', createList)
router.get('/get/todolist', showList)
router.get('/get/todo/:id', showSingleList)
router.put('/updatelist/:id', updateRecord)
router.delete('/deletelist/:id', deleteRecord)

module.exports = router