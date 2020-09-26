const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const sql = require("./database.js");

sql.userTable();

const app = express();


app.get("/", (req, res) => {
    res.send("Server works");
});



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});