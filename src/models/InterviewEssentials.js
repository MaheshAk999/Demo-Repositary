const mongoose=require('mongoose')
const TechnicalQuestions = new mongoose.Schema({
    question:String,
    answer: String,
    type: String,
    code:String
});
const NewModel=new mongoose.Schema({
    name:String,
    age:Number,
    gender:String  
})
const GietMedha = new mongoose.Schema({
    TeamLeadName: { type: String, required: true },
    TeamLeadPinno: { type: String, required: true },
    College: { type: String, required: true },
    Branch: { type: String, required: true },
    Year: { type: Number, required: true },
    TeamMembersandPinno: { 
        type: Object, 
        required: true 
    },
    RegisterEvents: { type: String, required: true }
});
module.exports.GietMedhaAndMaitri=mongoose.model('GietEvent',GietMedha)
module.exports.NewModel=mongoose.model('LatestModel',NewModel)
module.exports.InterviewEssentialsTechnical=mongoose.model('InterviewEssentialsTechnical',TechnicalQuestions)