const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if ( !request.token || !decodedToken.id) {
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

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if ( !request.token || !decodedToken.id) {
    return response.status(401).json( { error: "Missing or invalid token"})
  }

  const activeUser = await User.findById(decodedToken.id)
  if (!activeUser) {
    return response.status(401).json( { error: "User not found" } )
  }

  const blog = await Blog.findById(request.params.id)
  const blogUser = blog.user.toString()

  if (activeUser.id !== blogUser) {
    return response.status(401).json( { error: 'Not authorized'})
  }

  const blogId = blog.id.toString()
  await blog.remove()

  const i = activeUser.blogs.findIndex( blog => blog.toString() === blogId )
  
  if ( i > -1 ) {
    let newBlogs = activeUser.blogs
    newBlogs.splice(i,1)
    activeUser.blogs = newBlogs
    await activeUser.save()
  }

  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const content = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: request.body.user
  }

  const update = await Blog
    .findByIdAndUpdate(id, content, { new: true, runValidators: true, context: 'query' })
    .populate('user', { username: 1, name: 1, id: 1 })
    response.json(update)
})

module.exports = blogRouter