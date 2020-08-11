const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const blog = require('../models/blog')

beforeEach(async () => {

  await Blog.deleteMany({})

  const blogs = helper.initialBlogs.map(blog => new Blog(blog))
  const promises = blogs.map(blog => blog.save())

  await Promise.all(promises)
})

test('api test: blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('api test: there are two blogs in db', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('api test: the 2nd blog is about Sunlight', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    'Sunlight'
  )
})

test('api test: adding a new blog', async () => {

  const blog = new Blog({
    title: 'Test blog',
    author: 'AI',
    url: 'www.everywhere.net',
    likes: 100
  })

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  const titles = blogs.map(r => r.title)

  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain('Test blog')
})

test('api test: a blog without title will not be added', async () => {

  const blog = new Blog({
    author: 'AI',
    url: 'www.everywhere.net',
    likes: 100
  })

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length)
})

test('api test: a blog without url will not be added', async () => {

  const blog = new Blog({
    title: 'Test blog',
    author: 'AI',
    likes: 100
  })

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length)
})

test('api test: blogs have an id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('api test: adding a new blog without likes', async () => {

  const blog = new Blog({
    title: 'Test blog',
    author: 'AI',
    url: 'www.everywhere.net'
  })

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()

  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogs[helper.initialBlogs.length].likes).toBe(0)
})

test('api test: check deleted blog is deleted', async () => {
  let blogs = await helper.blogsInDb()
  expect(blogs.map(b => b.title)).toContain("Google")

  const blog = blogs[0]
  const id = blog.id
  await api.delete(`/api/blogs/${id}`)
    .expect(204)

  blogs = await helper.blogsInDb()
  expect(blogs.map(b => b.title)).not.toContain(blog.title)
})

test('api test: blogs can be updated', async () => {
  let blogs = await helper.blogsInDb()
  const newBlog = { ...blogs[0], likes: 99 }
  const id = newBlog.id
  delete newBlog.id

  await api
    .put(`/api/blogs/${id}`)
    .send(newBlog)

  blogs = await helper.blogsInDb()
  console.log(blogs[0])
  expect(blogs[0].likes).toBe(99)
})

afterAll(() => {
  mongoose.connection.close()
})
