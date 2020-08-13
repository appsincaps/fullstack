const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
  username: { type: String, minlength: 3, required: true, unique: true },
  name: { type: String },
  password: { type: String, required: true }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User