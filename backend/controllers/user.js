const db = require("../db/database.js");


//CREATE DATABASE
exports.createUserDB = (req, res) => {
    let q = 'CREATE DATABASE Todo';
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("DB created");
    })
}

exports.createUserTable = (req, res) => {  
    var sql = "CREATE TABLE user (id INT AUTO_INCREMENT, fname VARCHAR(255), lname VARCHAR(255), timestamp TIMESTAMP,  PRIMARY KEY(id))";  
    db.query(sql, (err, result) => {  
    if (err) throw err;  
    return res.status(201).json("Table created");
    });  
};  

exports.createUserList = (req, res) => {  
    var sql = "INSERT INTO user SET ?"; 

    let timestamp = new Date()
    const {fname, lname} = req.body

    db.query(sql, {fname, lname, timestamp}, (err, result) => {  
    if (err) return res.json(err);  
    return res.status(200).json(result);
    });  
};  

exports.showUserList = (req, res) => {  
    var sql = "SELECT * FROM user";  

    db.query(sql, (err, result) => {  
    if (err) return res.json(err);  
    return res.status(200).json(result);
    });  
};  

exports.showSingleUser = (req, res) => {  
    var sql = `SELECT * FROM user where id=${req.params.id}`;  

    db.query(sql, (err, result) => {  
    if (err) return res.json(err);  
    return res.status(200).json(result[0]);
    });  
};

exports.updateUserRecord = (req, res) => {  
        //check if the user exists
    var sql = `UPDATE user SET ? WHERE id=${req.params.id}`;
    let timestamp = new Date()
    const {fname, lname} = req.body

    db.query(sql, {fname, lname, timestamp}, (err, result) => {  
    if (err) return res.json(err);  
    return res.status(200).json(result);
    });  
}; 

exports.deleteUserRecord = (req, res) => {  
        //check if the user exists

    var sql = `DELETE FROM user where id=${req.params.id}`;  

    db.query(sql, (err, result) => {  
    if (err) return res.json(err);  
    return res.status(200).json("Record Deleted");
    });  
};