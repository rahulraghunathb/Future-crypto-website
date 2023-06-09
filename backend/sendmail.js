const nodemailer = require('nodemailer');
const EmailModel = require('./emailModel');
const cron = require('node-cron');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rahulraghunathb2.0@gmail.com',
        pass:'vmqmtmnoathprwyf'
    }
});

function scheduleDailyEmails() {

    cron.schedule('0 9 * * *', () => {sendEmails();});

  }


function sendEmails(){

    EmailModel.find()
        .then((emails) =>{
            if(emails.length ==0) {
                console.log('No emails found');
                return;
            }

            const mailOptions = {
                from: 'rahulraghunathb2.0@gmail.com',
                to: emails.map((email) => email.email).join(','),
                subject: 'Daily Newsletter',
                text:'Hi rahul, this is for testing your website!'
            
            };

            transporter.sendMail(mailOptions,(error,info) => {
                if(error){
                    console.error('Error sending emails:', error);
                    return
                }
                console.log('Email sent:', info.response);
            
            });
    })
    .catch((error)=>{
        console.error('Error retrieving emails:', error);
    })
}




module.exports={scheduleDailyEmails};