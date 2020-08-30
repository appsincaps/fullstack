import blogService from '../../src/services/blogs'

describe('Blog app', function() {

  beforeEach( function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'User Name',
      username: 'username',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const user2 = {
      name: 'User2 Name',
      username: 'username2',
      password: 'password2'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login', function() {
    it('Successfull login', () => {
      cy.get('input:first').clear().type('username')
      cy.get('input:last').clear().type('password')
      cy.contains('Login').click()
      cy.contains('User Name')
    })

    it('Unsuccessfull login', () => {
      cy.get('input:first').clear().type('username')
      cy.get('input:last').clear().type('wrong_password')
      cy.contains('Login').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'username', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('Create a new blog').click()
      cy.get('input#title').type('New test title')
      cy.get('input#author').type('Title Author')
      cy.get('input#url').type('http://url.title.net')
      cy.get('#submit').click()

      cy.contains('New test title')
      cy.contains('view').click()
    })
  })

  describe('After a blog is created', function() {
    beforeEach(function() {
      cy.login({ username: 'username', password: 'password' })
      cy.contains('Create a new blog').click()
      cy.get('input#title').type('New test title')
      cy.get('input#author').type('Title Author')
      cy.get('input#url').type('http://url.title.net')
      cy.get('#submit').click()
    })

    it('can be liked', function() {
      cy.contains('view').click()
      cy.contains('Like').click()
      cy.contains('likes 1')
    })

    it('can be deleted by owner', function() {
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.should('not.contain','New test title')
    })

    it('cannot be deleted by others', function() {
      cy.contains('Logout').click()
      cy.login({ username: 'username2', password: 'password2' })
      cy.contains('view').click()
      cy.should('not.contain','delete')
    })
  })

  describe('After several blogs are created', function() {
    beforeEach(function() {
      cy.login({ username: 'username', password: 'password' })
        .then( function() {
          const auth = {
            Authorization: `bearer ${Cypress.env('token')}`
          }

          for (let i=0; i<3; i++) {
            cy.request({
              method: 'POST',
              url: 'http://localhost:3003/api/blogs',
              body: {
                title: `Title #${3-i}`,
                author: 'author',
                url: 'url',
                likes: i+1
              },
              headers: auth
            })
          }
        })
      cy.visit('http://localhost:3000')
    })

    it('blogs are sorted', function() {
      cy.get('.blog:first')
        .should('contain','#1')
      cy.get('.blog:last')
        .should('contain','#3')
    })

  })

})