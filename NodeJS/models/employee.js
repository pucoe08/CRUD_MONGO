// defining type of object that will be passed to table

const mongoose = require('mongoose');

var Employee = mongoose.model('Employee',{
    name: {type: String},
    position: {type: String},
    office: {type: String},
    salary: {type: Number}

}, 'Employees');                        //Table Name

module.exports={
    Employee 
} 
