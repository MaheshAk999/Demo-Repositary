const mongoose = require('mongoose');

const registrations=new mongoose.Schema({
    event_names:[{type:String,required:true}],
    year_of_study:{type:Number,required:true},
    branch:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    student_name:{type:String,required:true},
    whatsapp_number:{type:String,required:true},
    registration_date:{type:Date,default:Date.now},
    others: { type: String },
    state: { type: String },
    college:{type:String} 
})


module.exports=mongoose.model('registrations',registrations);

