const express = require('express');
const router = express.Router();
const userController = require('../controllers/InterviewEssentials');
router.get('/InterviewEssentialsGetData/:Type', userController.GetQuestions);
router.get('/InterviewEssentialsPostData/:Category/:Type', userController.PostQuestions);
router.get('/',userController.Intro)
router.get('/Admin',userController.Admin)
router.post('/AdminPost',userController.AdminPost)
module.exports=router