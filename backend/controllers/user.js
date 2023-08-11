const db = require("../db/database.js");

// Function to create the 'user' table
exports.createUserTable = (req, res) => {
    // SQL query to create the 'user' table with necessary columns
    var sql = "CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT, fname VARCHAR(255), lname VARCHAR(255), timestamp TIMESTAMP,  PRIMARY KEY(id))";

    // Execute the SQL query to create the table
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json("Table creation failed");
        }
        return res.status(201).json("Table created");
    });
};

// Function to create a new user
exports.createUserList = (req, res) => {
    // SQL query to insert a new user into the 'user' table
    var sql = "INSERT INTO user SET ?";

    const timestamp = new Date();
    const { fname, lname } = req.body;

    // Data to be inserted into the table
    const newUser = {
        fname,
        lname,
        timestamp
    };

    // Execute the SQL query to insert the new user
    db.query(sql, newUser, (err, result) => {
        if (err) {
            return res.status(500).json("User creation failed");
        }
        return res.status(200).json(result);
    });
};

// Function to retrieve all users
exports.showUserList = (req, res) => {
    // SQL query to select all users
    var sql = "SELECT * FROM user";

    // Execute the SQL query to retrieve users
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json("Failed to retrieve users");
        }
        return res.status(200).json(result);
    });
};

// Function to retrieve a single user
exports.showSingleUser = (req, res) => {
    // SQL query to select a single user based on their ID
    var sql = `SELECT * FROM user WHERE id=${req.params.id}`;

    // Execute the SQL query to retrieve the single user
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json("Failed to retrieve user");
        }
        if (result.length === 0) {
            // No user found for the specified ID
            return res.status(404).json("User not found");
        }
        return res.status(200).json(result[0]);
    });
};

// Function to update a user's information
exports.updateUserRecord = (req, res) => {
    // SQL query to update a user's information based on their ID
    var sql = `UPDATE user SET ? WHERE id=${req.params.id}`;
    const timestamp = new Date();
    const { fname, lname } = req.body;

    // Data to be updated in the table
    const updatedUserData = {
        fname,
        lname,
        timestamp
    };

    // Execute the SQL query to update the user
    db.query(sql, updatedUserData, (err, result) => {
        if (err) {
            return res.status(500).json("Failed to update user");
        }
        if (result.affectedRows === 0) {
            // No rows were affected, meaning the user with the specified ID was not found
            return res.status(404).json("User not found");
        }
        return res.status(200).json(result);
    });
};

// Function to delete a user
exports.deleteUserRecord = (req, res) => {
    // SQL query to delete a user based on their ID
    var sql = `DELETE FROM user WHERE id=${req.params.id}`;

    // Execute the SQL query to delete the user
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json("Failed to delete user");
        }
        if (result.affectedRows === 0) {
            // No rows were affected, meaning the user with the specified ID was not found
            return res.status(404).json("User not found");
        }
        return res.status(200).json("Record Deleted");
    });
};
