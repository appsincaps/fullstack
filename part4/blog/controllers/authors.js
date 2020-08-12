const bcrypt = require('bcrypt')
const authorRouter = require('express').Router()
const Author = require('../models/author')

authorRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password || body.password.length < 3) {
    return response.status(400).json( {error: "minimum password length is 3 characters"} )
  }

  const saltRounds = 10
  const password = await bcrypt.hash(body.password, saltRounds)

  const newAuthor = new Author({
    username: body.username,
    name: body.name,
    password
  })

  const savedAuthor = await newAuthor.save()
  response.status(201).json(savedAuthor)
})

authorRouter.get('/', async (request, response) => {
  const authors = await Author.find({})
  response.json(authors)
})

module.exports = authorRouter