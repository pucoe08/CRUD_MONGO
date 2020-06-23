const express = require('express');
var router = express.Router();
// As per my understanding we have exported Employee object in employee.js that we r using here
var { Employee } = require('../models/employee');
var ObjectId = require('mongoose').Types.ObjectId;  //variable used to check whether id passed is valid mongo id
console.log("I am in employeeController");
module.exports = router;
// => Url of get request localhost:3000/employees/
router.get('/', (req, res) => {

    Employee.find((err, docs) => {
        if (!err) {
            res.send(docs);                       // Docs that we receive from database are added to 
                                                //response variable  res
        }
        else {
            console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2))
        }
    });

});

router.get('/:id', (req, res) => {

    Employee.find((err, docs) => {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send('No record with given id : ${req.params.id}');
            Employee.findById(req.params.id, (err, docs) => {
            if (!err) {
                res.send(docs);
            }
            else {
                console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2))
            }

        });
    });

});

// => Url of post request "localhost:3000/employees/" is same as that of get request
router.post('/', (req, res) => {
// "req" parameters includes json object, is added to emp object using body function of req 
console.log("I am in emp controller");
console.log(req.body.name);
console.log(req.body.position);

    var emp= new Employee({                
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
       
    });
//To insert emp object in mongoDb
    emp.save((err, doc) => {
        if (!err) {
            res.send(doc);    //mongoDb also sends back the emp object as 'doc' with one more prop added 'id'
        }
        else {
            console.log('Error in Saving  Employees :' + JSON.stringify(err, undefined, 2))
        }
    });

});

//for updation
router.put('/:id', (req, res) => {

    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : od wh${req.params.id}');
    var emp = {                  //This object in not like put method where we added Employee model object
        name: req.body.name,
        position: req.body.position,
        office:req.body.office,
        salary: req.body.salary
    };
    
    Employee.findByIdAndUpdate(req.params.id,{$set: emp}, {new: true}, (err, doc)=>{
        if (!err)                           // if new: true than in doc we will have updated info 
         {                                 // if new: false than in doc we will have old info although record is updated
            res.send(doc);
        }
        else {
            console.log('Error in Updating EmployeeData :' + JSON.stringify(err, undefined, 2))
        }
    });
   
});

router.delete('/:id', (req, res) => {

    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}');
        
    Employee.findByIdAndRemove(req.params.id,(err, doc)=>{
        if (!err)
         {
            res.send(doc);
        }
        else {
            console.log('Error in Deleting Employees :' + JSON.stringify(err, undefined, 2))
        }
    });
   
});

