const db = require('../db/database')

// Function to create the database
exports.createDB = (req, res) => {
    // SQL query to create the database 'Todo'
    let q = 'CREATE DATABASE IF NOT EXISTS Todo';
    db.query(q, (err, result) => {
        if (err) {
            return res.status(500).json("Database creation failed");
        }
        return res.status(201).json("DB created");
    });
}