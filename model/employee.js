// initialization
var Mongoose = require("mongoose");

// schema creation

const employeeSchema = Mongoose.Schema(
    {
        name : String,
        location : String,
        position : String,
        salary : {
            type : Number,
            requied : true
        }
    }
) ;

// creating model
var EmployeeModel = Mongoose.model(
    "Employees",employeeSchema
);

// exporting
module.exports = EmployeeModel;