const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  next()
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
