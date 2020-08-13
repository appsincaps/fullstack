const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getToken = request => {
  const auth = request.get('Authorization')
  if ( !auth || !auth.toLowerCase().startsWith('bearer') ) return null
  return auth.substring(7)
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {

  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  
  if ( !token || !decodedToken.id) {
    return response.status(401).json( { error: "Missing or invalid token"})
  }

  const activeUser = await User.findById(decodedToken.id)
  if (!activeUser) return response.status(401).json( { error: "User not found" } )

  const content = {
    url: request.body.url, 
    title: request.body.title,
    author: request.body.author,
    user: activeUser._id,
    likes: request.body.likes || 0
  }
  const blog = new Blog(content)
  const result = await blog.save()

  if (!activeUser.blogs) activeUser.blogs = []
  activeUser.blogs = activeUser.blogs.concat(result._id)
  const update = await activeUser.save()

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