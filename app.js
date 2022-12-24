// Task1: initiate app and run server at 3000
const express = require("express");
const Mongoose = require("mongoose");
const EmployeeModel = require("./model/employee");
const app = new express();
app.use(express.json());
app.use(express.urlencoded({extended:"true"}));


const path=require('path');
const { default: mongoose } = require("mongoose");
const { error } = require("console");
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 

Mongoose.connect('mongodb+srv://sujeeshkumar:sujeesh@cluster2.ankzmma.mongodb.net/?retryWrites=true&w=majority');


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',(req,res)=>{
    try{
        EmployeeModel.find().then(function(data){
    res.send(data)
})
}catch(error){
    console.log(error)
}
})


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id',(req,res)=>{
    try{
        EmployeeModel.findOne({"_id":req.params.id}).then(function(data){
res.send(data)
})
}catch(error){
    console.log(error)
}
})




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{
    try{
        let item=req.body;
        console.log('data from frontend',item)
        const user=new EmployeeModel(item)
        const savedUser=await user.save()
        res.send()
        console.log(savedUser)
    }
    catch(error){
        console.log(error)
    }
})





//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',(req,res)=>{
    let id=req.params.id;
    EmployeeModel.findByIdAndDelete({"_id":id}).then(()=>{
        res.send();
    })
})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',(req,res)=>{
    let id=req.body._id;
    EmployeeModel.findByIdAndUpdate({"_id":id},{
    $set:{
        "name":  req.body.name,
        "location":req.body.location,
        "position":req.body.position,
        "salary":req.body.salary
    }
    })
    .then(function(){
    res.send();
    }) 
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


// Listening to port
app.listen(3000,()=>{
    console.log("server started listening port 3000")
});
