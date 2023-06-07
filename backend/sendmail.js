var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rahulraghunathb2.0@gmail.com',
        pass:'vmqmtmnoathprwyf'
    }
});

var mailOptions ={
    from: 'rahulraghunathb2.0@gmail.com',
    to: 'rohamet689@pyadu.com',
    subject: 'This is a testing mail',
    text:'Hi rahul this is for testing your website'

};

transporter.sendMail(mailOptions,function(error,info){
    if(error){console.log(error);}
    else{console.log('Email sent successfully   '+info.response)}
});