require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const sql = require("./database.js");

sql.userTable();

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/templates/signup.html");
});


app.post('/signup', (req, res)=> {
    console.log(req.body)
    res.json(req.body);
})

app.post('/login', async (req, res)=> {
    console.log(req.body)
    let users = await sql.findUserByEmailAndPassword(req.body.email, req.body.password)
    console.log(users)
    res.json(users[0])
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});