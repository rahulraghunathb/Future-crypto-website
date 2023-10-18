const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const session = require('express-session')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const app = express()

// Replace these with your actual credentials
const GOOGLE_CLIENT_ID = process.env.YOUR_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.YOUR_CLIENT_SECRET

// Connect to your MongoDB database
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

// Define a user model schema (adjust as needed)
const User = mongoose.model('UserGoogle', {
  googleId: String,
  displayName: String
})

// Configure the Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback' // Replace with your callback URL
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if user with this Google ID already exists in the database
      const existingUser = await User.findOne({ googleId: profile.id })

      if (existingUser) {
        return done(null, existingUser)
      }

      // If the user does not exist, create a new user
      const user = new User({
        googleId: profile.id,
        displayName: profile.displayName
      })

      await user.save()
      done(null, user)
    }
  )
)

// Serialize and deserialize user information
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

// Set up Express and Passport
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(
//   session({ secret: 'your-secret-key', resave: true, saveUninitialized: true })
// )
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.get('/', (req, res) => {
  res.send('Home page')
})

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard')
  }
)

app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Welcome to the dashboard, ' + req.user.displayName)
  } else {
    res.redirect('/')
  }
})

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
