const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {

  const body = request.body
  const user = await User.findOne({username: body.username})
  const loggedOk = !user 
    ? false
    : await bcrypt.compare(body.password, user.password)

  if (!loggedOk) {
    return response.status(401).json( { error: "Bad username or password"})
  }

  const userForToken = {
    username: user.username,
    name: user.name,
    id: user.id
  }
  const token = jwt.sign( userForToken, process.env.SECRET)
  console.log(token)
  response
    .status(200)
    .json({ token: token, username: user.username, name: user.name })
  
})

module.exports = loginRouter