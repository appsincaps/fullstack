const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('api test: blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('api test: there are three blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(3)
})

test('api test: the 2nd blog is about Sunlight', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[1].title).toBe('Sunlight')
})

afterAll(() => {
  mongoose.connection.close()
})
