const express = require("express");
const bodyParser = require("body-parser");
const sql = require("./database.js");

sql.userTable();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Server works");
});

app.post('/signup', (request,response)=> {
    console.log(request.body)
    res.json(request.body);
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});