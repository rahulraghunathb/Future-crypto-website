const mongoose = require('mongoose');
const dotenv = require ('dotenv');
const express = require('express');
const app = express();
const EmailModel = require('./emailModel');
const sendmail = require('./sendmail');
const cors = require('cors');



app.use(cors({
  origin: ["http://localhost:3000/","https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false"]
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());


dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('PASSWORD',process.env.DATABASE_PASSWORD);


mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con =>{
    console.log('DB connection established');
    
});

sendmail.scheduleDailyEmails();


app.get('/',(req,res) => {
    res.send('This is the server!');
});


app.post('/subscribe', async (req, res) => {

    const { email } = req.body;
    try {
      
  
      const newEmail = new EmailModel({ email });
      await newEmail.save();
  
      res.status(200).json({ message: 'Email subscribed successfully' });
    } catch (error) {
      console.error('Error subscribing email:', error);
      res.status(500).json({ error: 'Failed to subscribe email' });
    }


  });


const port = process.env.PORT || 8000;
app.listen(port,()=> {
    console.log('listening to requests on port 8000');
});


