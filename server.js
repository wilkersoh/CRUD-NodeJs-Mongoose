require("./models/db");
const path = require("path");
const express = require("express");
const exphbs  = require('express-handlebars');
const bodyparser = require("body-parser");
const app = express();

app.set("views ", path.join(__dirname, './views/'));
app.engine('handlebars', exphbs({defaultLayout: 'mainLayout'}))
app.set('view engine', 'handlebars');
app.use(bodyparser.urlencoded({extended: false}));

// Route
app.use('/employee', require("./controllers/employeeController"));

 

app.listen(3000, () => console.log("Connect 3000 port server"))
