const express = require('express')
const { createUserDB, createUserTable, createUserList, showUserList, showSingleUser, updateUserRecord, deleteUserRecord } = require('../controllers/user')
const router = express.Router()

router.get('/create/database', createUserDB) //remove this from here
router.get('/create/usertable', createUserTable)
router.post('/create/user', createUserList)
router.get('/get/user', showUserList)
router.get('/get/user/:id', showSingleUser)
router.put('/updateuser/:id', updateUserRecord)
router.delete('/deleteuser/:id', deleteUserRecord)

module.exports = router