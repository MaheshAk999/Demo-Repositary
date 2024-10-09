const dotenv=require('dotenv')
dotenv.config()
const mongoose=require('mongoose')
mongoose.connect(process.env.DEPLOYED_DATABASE).then(()=>{
    console.log("Connected to MangoDB Atlas")
}).catch((err)=>{
    console.log(err)
})