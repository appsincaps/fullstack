const Blog = require('../models/blog')
const Author = require('../models/author')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: "Google",
    author: "SF",
    url: "www.google.com",
    likes: 0
  },
  {
    title: "Sunlight",
    author: "SF",
    url: "www.sunlightx.com",
    likes: 1
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: "None",
    author: "",
    url: "xxx",
    likes: 0
  },)
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const authorsInDb = async () => {
  const authors = await Author.find({})
  return authors.map(author => author.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, authorsInDb
}