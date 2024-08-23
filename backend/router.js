const express=require('express');
const router=express.Router();

const {Home}=require('./Controllers/Home.js');

router.get('/Home',Home)



module.exports =router;