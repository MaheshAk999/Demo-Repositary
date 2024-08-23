const express=require('express');
const router=express.Router();
const {register}=require('./Controllers/register.js');
const {get}=require('./Controllers/get.js');
const {Mail}=require('./Controllers/Mail.js');

router.post('/test',register,Mail)
router.post('/get',get)




module.exports =router;