const mongoose = require('mongoose');
const Registration = require('../Models/registrations.js'); 


exports.ge=(req,res)=>{

    const {event}=req.body;
    Registration.aggregate([
        { $unwind: "$event_name" },
        { $match: { event_name:event} },
       
    ])
    .then(result => {
        res.send(result); 
    })
    .catch(err => {
        res.status(500).send(err);
    });

}





