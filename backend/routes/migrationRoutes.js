const express = require("express")
const { createDB } = require("../controllers/migration")
const router = express.Router()

router.get("create/database", createDB)

module.exports = router