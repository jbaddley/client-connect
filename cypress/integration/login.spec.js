// login.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Logging in', () => {
    it('Should not allow log in with bad username', () => {
        cy.visit('http://localhost:3000')

        cy.get('input[name="username"]')
          .type('fake@email.com')
          .should('have.value', 'fake@email.com')

        cy.get('input[name="password"]')
          .type('password')
          .should('have.value', 'password')

        cy.contains('Sign In').click()

        cy.contains("Could not find user").should('be.visible')
    })

    it('Should log in and redirect', () => {
        cy.visit('http://localhost:3000')

        cy.get('input[name="username"]')
          .type('jbaddley3')
          .should('have.value', 'jbaddley3')

        cy.get('input[name="password"]')
          .type('Password')
          .should('have.value', 'Password')

        cy.contains('Sign In').click()

        cy.url().should('include', '/companies')
    })
  })
