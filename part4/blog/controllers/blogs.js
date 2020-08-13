const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {

  const users = await User.find({})
  const activeUser = users[0]

  const content = {
    url: request.body.url, 
    title: request.body.title,
    author: request.body.author,
    user: activeUser._id,
    likes: request.body.likes || 0
  }
  const blog = new Blog(content)

  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const content = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const update = await Blog
    .findByIdAndUpdate(id, content, { new: true, runValidators: true, context: 'query' })
  response.json(update)
})

module.exports = blogRouter