const express = require("express");
const app = express();

//Cors
const cors = require("cors");
app.use(cors());


//Database
const connection = require("./src/database");

//Model
const modelStudents = require("./src/model/Students");
const modelAuth = require("./src/model/Auth");


// Body Parser
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Router
const routes = require("./src/routes");

app.use("/students", routes);


module.exports = app;