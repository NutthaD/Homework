const express = require('express');
const mysql = require('mysql2');
require('dotenv').config()
const SHA256 = require("crypto-js/sha256");
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

let data = []

const db = mysql.createConnection({
    namedPlaceholders: true,
    host: "localhost",
    user: "root",
    password: "",
    database: "gosoft-hw5"
})

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log("mysql connected")

})

app.post('/employee/create', (req, res) => {

    if (!req.body.username ||
        !req.body.password) {
        return res.status(400).send("Error : invalid data");
    }
    const hashpassword = SHA256(req.body.password).toString()

    console.log(hashpassword)
    let sql = 'INSERT INTO login VALUE (:id,:username,:password)'
    let query = db.query(sql, {
        username: req.body.username,
        password: hashpassword
    }, (err, results) => {
        if (err) {
            return res.send('Error : something wrong' + err);
        }
        res.send("Data inserted")
    })

})


app.post('/employee/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send('User can not be found.')
    }
    try {
        const hashpassword = SHA256(req.body.password).toString()
        console.log(hashpassword)
        let sql = 'SELECT password FROM login WHERE password=:password AND username =:username'
        let query = db.query(sql, {
            password: hashpassword,
            username: req.body.username
        }, (err, results) => {
            if (err) {
                return res.send('something wrong' + err);
            }
            if (results.length > 0) {
                const username = req.body.username
                const userath = { username: username }
                const accesstoken = jwt.sign(userath, process.env.ACCESS_TOKEN_SECRET)
                res.json({ accesstoken: accesstoken })
            }
            else {
                console.log(results)
                res.status(400).send('Password worng or Empty')
            }
        })

    } catch (error) {
        res.status(500).send('NOT OK' + error)
    }
})

app.get('/employee/get_data', authToken, (req, response) => {
    let sql = 'SELECT * FROM employee_data'
    let query = db.query(sql, (err, res) => {
        if (err) throw err
        response.send(res)
    })
})

app.post('/employee/createData', authToken, (req, response) => {

    if(!req.body.Fname ||
        !req.body.Lname ||
        !req.body.ID ||
        !req.body.Position ||
        !req.body.Tel ||
        !req.body.Email){
            return res.status(400).send("Error : invalid data");
        }

    for (let i = 0; i < data.length; i++) {
        if (data[i].Employee_ID == req.body.ID ||
            data[i].Telephone == req.body.Tel ||
            data[i].Email == req.body.Email)
            return response.status(400).send("Error : already have data");
    }

    console.log(req.body);


    let sql = 'INSERT INTO employee_data VALUE (:Firstname ,:Lastname ,:Employee_ID,:Position ,:Telephone ,:Email)'
    let query = db.query(sql, {
        Firstname: req.body.Fname,
        Lastname: req.body.Lname,
        Employee_ID: req.body.ID,
        Position: req.body.Position,
        Telephone: req.body.Tel,
        Email: req.body.Email

    }, (err, results) => {
        if (err) {
            return response.send('something wrong' + err);
        }
        response.send("Add data success")
    })

})

app.put('/employee/edit_data', authToken, (req, response) => {
    if(!req.body.ID ||
        !req.body.Position ||
        !req.body.Tel ||
        !req.body.Email){
            return res.status(400).send("Error : invalid data");
        }

    for (let i = 0; i < data.length; i++) {
        if (data[i].Employee_ID == req.body.ID) {
            data[i].Position = req.body.Position
            data[i].Telephone = req.body.Tel
            data[i].Email = req.body.Email
            return res.send("Submit")
        }
    }

    let sql = 'UPDATE employee_data SET Position =:pos ,Tel =:tel ,Email =:email WHERE ID =:id'
    let query = db.query(sql, {
        id: req.body.ID,
        pos: req.body.Position,
        tel: req.body.Tel,
        email: req.body.Email

    }, (err, results) => {
        if (err) {

            return response.send('something wrong' + err);
        }

        response.send("Update success")

    })

})

app.delete('/employee/delete_data', authToken, (req, res) => {
    if(!req.body.ID){
        return res.status(400).send("Error : invalid data");
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].Employee_ID == req.body.ID) {
            data.splice(i, 1);
            return res.send("Submit");
        }
    }

    let sql = 'DELETE FROM employee_data WHERE ID =:id'
    let query = db.query(sql, {
        id: req.body.ID,


    }, (err, results) => {
        if (err) {

            return res.send('something wrong' + err);
        }

        return res.send("Delete success")

    })
})


function authToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null){
        return res.status(401).send("NO TOKEN FOUND")
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userath) => {
        if (err){
            return res.status(403).send("you don't have permission to enter")
        }
        req.userath = userath
        next()
    })

}

app.listen(3000, () => {
    console.log("Listening on port: 3000");
});