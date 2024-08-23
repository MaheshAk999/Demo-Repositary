const mongoose=require('mongoose');

exports.mongodb=()=>{

    mongoose.connect(process.env.MONGODB).then(()=>{
        console.log('MongoDB Connected...');
    })
    


}
