const express = require("express");
const bodyParser = require("body-parser");
const sql = require("./database.js");

sql.userTable();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/templates/signup.html");
  });


app.post('/signup', (req,res)=> {
    console.log(req.body)
    res.json(req.body);
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});