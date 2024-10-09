 const dotenv=require('dotenv')
 dotenv.config()
 const morgan=require('morgan')
 const express=require('express')
 const cors=require('cors')
 const compression=require('compression')
 const app=express()
 const Routes=require('./src/routes/app.js')
 const Mangoose=require('./src/config/Mangoose.js')
 app.use(cors())
 app.use(morgan('dev'))
 app.use(compression());
 app.use('/',Routes)
 const port=process.env.PORT 
 app.listen(port,()=>{
     console.log("Server is listening on 8080")
 })
