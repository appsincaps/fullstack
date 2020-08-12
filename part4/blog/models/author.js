const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const authorSchema = new mongoose.Schema({
  username: { type: String, minlength: 3, required: true, unique: true },
  name: { type: String },
  password: { type: String, required: true }
})

authorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

const Author = mongoose.model('Author', authorSchema)

module.exports = Author