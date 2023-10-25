const mongoose = require('mongoose')
const dotenv = require('dotenv')
const express = require('express')
const bcrypt = require('bcrypt')
const UserModel = require('./userModel') // Import the user model
const EmailModel = require('./emailModel')
const sendmail = require('./sendmail')
const cors = require('cors')

const app = express()

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://api.coingecko.com',
      'https://futute-crypto.onrender.com'
    ]
  })
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace(
  'PASSWORD',
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((con) => {
    console.log('DB connection established')
  })

sendmail.scheduleDailyEmails()

app.get('/', (req, res) => {
  res.send('This is the server!')
})

app.post('/subscribe', async (req, res) => {
  const { email } = req.body
  try {
    const newEmail = new EmailModel({ email })
    await newEmail.save()

    res.status(200).json({ message: 'Email subscribed successfully' })
  } catch (error) {
    console.error('Error subscribing email:', error)
    res.status(500).json({ error: 'Failed to subscribe email' })
  }
})

// Register a new user route
app.post('/register', async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      res.status(400).json({ error: 'Email is already in use' })
      return
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({ email, password: hashedPassword })
    await newUser.save()
    console.info('User registered successfully')
    res.status(200).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({ error: 'Failed to register user' })
  }
})

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      // Successful login
      // req.session.userId = user._id
      res.status(200).json({ message: 'User logged in successfully' })
      console.info('User logged in successfully')
      // res.redirect('/')
    } else {
      // Failed login
      // res.redirect('/login?error=1')
      res.status(500).json({ error: 'Failed to login' })
    }
  } catch (error) {
    console.error('Error during login:', error)
    res.status(400).json({ error: 'Failed to login' })
  }
})

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log('Listening to requests on port 8000')
})
