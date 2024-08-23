const nodemailer=require('nodemailer');
var Mailgen = require('mailgen');

var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
       
        name: 'Medha Team',
        link: 'https://admissions.ggu.edu.in/',
        copyright: 'Copyright © 2024 Godavari Global University. All rights reserved.',
        logo: 'https://admissions.ggu.edu.in/wp-content/uploads/2024/03/GGU-new-logo.png'
    }
});
const nodeConfig={
        service:"gmail",
        secure:false,
        auth:{
            user:process.env.email,
            pass:process.env.passkey
        }
}


const transpoter=nodemailer.createTransport(nodeConfig);

const data={
    "Paper Presentation":"PAP",
    "Poster Presentation":"POP",
    "Project Expo":"PE",
    "Interactive Web Design":"IWD",
    "Robo Race":"RR",
    "Short Film Making":"SFM",
    "Treasure Hunt":"TF",
    "Technical Quiz":"TQ"

}

exports.Mail=async(req,res)=>{

    const {email,event_name,student_name}=req.body;
    const id=req.id;

    // var string="";
    // for(let i=0;i<req.en.length;i++){
    //     string+="<li>"+req.en[i]+"</li>";
    // }
    
   
    var Email = {
        body: {
            name: `${student_name}`,
            signature: 'Best regards',
            greeting: 'Dear',
            intro: `We are pleased to confirm your successful registration for the <b>"${req.en}"</b><br></br>
            <b>Your Event Registration ID:<br></br>${data[req.en]+id}</b>`,
            action: {
                instructions: 'please join our WhatsApp group for further updates and notifications',
                button: {
                    color: '#22BC66',
                    text: 'Join in whatsApp group',
                    link: 'https://chat.whatsapp.com/JXQVsJ9CB3FH6muIv4W4hJ'
                }
            },
            outro: `We appreciate your cooperation in adhering to the registration guidelines and look forword to your active participation.
            <br></br>If you have any quations or need further assistance, feel free to reach out to us at<b> medha2k23@giet.ac.in</b>
            <br></br>Thank you for chosing to be a part of the <b>"${event_name}"</b> event. We anticipate an enriching and enjoyable experience for you.`
        }
    };

    var emailBody = mailGenerator.generate(Email);
    require('fs').writeFileSync('preview.html', emailBody, 'utf8');


const message={
        from:'muraliundela29@gmail.com', 
        to:email,
        subject:"Registration Successful",
        html:emailBody
    }

 await transpoter.sendMail(message).then((r)=>{
    res.status(200).send({status:true,msg:"Registration Successful "});
})
.catch((err)=>{
    console.log(err.message)
    res.status(200).send({status:false,msg:err.message});
})
}