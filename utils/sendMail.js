const nodemailer=require('nodemailer')
const dotenv=require('dotenv') 
dotenv.config()
const sendMail=async(email)=>{
    try{

        const transporter=nodemailer.createTransport({
            service:'Gmail',
            auth:{
                user: process.env.sender_email,
                pass: process.env.email_password,
            }
        })
    
        const details = {
            from: process.env.sender_email, // sender email address
            to: email,
            subject: 'Test Email For scheduling Interview',
            text: 'Please Be avilable',
          };
    
         const info= await transporter.sendMail(details)
         return info
  
    }
    catch(e){
        console.log("error",e)
    }
}

module.exports=sendMail