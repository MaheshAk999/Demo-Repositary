const express = require('express'); //For backend server & routing
const app = express();
const cors= require('cors');
const RegisterRoute=require('./Controllers/register.js')
app.use(express.json());

require('dotenv').config()
const router=require('./router.js');
const corsOptions = {
    origin: '*',  // Allow all origins temporarily
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


app.use('/medha',router);

app.listen(process.env.PORT || 7000, () => {
    console.log(`Server is running ....ON : 7000`);
});





