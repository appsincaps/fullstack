describe('Blog app', function() {

  beforeEach( function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'User Name',
      username: 'username',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
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
})