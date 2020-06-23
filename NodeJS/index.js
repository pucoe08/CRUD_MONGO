// starting the server

const express = require('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const { mongoose } = require ('./db.js');
// For using Router from employeeController.ja
var employeeController= require ('./controllers/employeeController.js');
var app=express();
app.use(bodyParser.json());
app.use(cors());
app.listen(3000, ()=> console.log('Server started at port : 3000 ') );
// to append employees in url of localhost using router of employeeController eg "http://localhost/employees"
app.use('/employees', employeeController);
