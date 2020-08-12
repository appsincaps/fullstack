const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const Author = require('../models/author')
const authorRouter = require('../controllers/authors')
const test_helper = require('./test_helper')
const api = supertest(app)

describe('author db: when there is one author in db', () => {

  beforeEach(async () => {
    await Author.deleteMany({})
    const password = await bcrypt.hash('mysecretword', 10)
    const author = new Author({
      username: 'Username',
      name: 'User name',
      password
    })
    await author.save()
  })

  test('author db: list all authors', async () => {
    const authors = await api
      .get('/api/authors')
      .expect(200)
      .body

    expect(authors).toHaveLength(1)
  })
})