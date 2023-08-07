/// <reference types="cypress" />

const NEW_USER = 'test' + Date.now()

describe('Demo Blaze', () => {
    it('Test 1', () => {

        //  Go to https://www.demoblaze.com/
        cy.visit(" https://www.demoblaze.com/")

        // Sign Up as a new user
        cy.get('#signin2').click()
        cy.get('#signInModal .modal-content').should('be.visible')
        cy.get('#sign-username').clear()
        cy.get('#sign-username').click().type(NEW_USER)
        cy.log(NEW_USER)
        cy.get('#sign-password').type('test123')
        cy.get('button').contains('Sign up').click()

        // Validate if you try signup with same user modal will appear
        cy.clearCookies()
        cy.reload()
        cy.get('#signin2').click()
        cy.get('#signInModal .modal-content').should('be.visible')
        cy.get('#sign-username').clear()
        cy.get('#sign-username').click().type(NEW_USER)
        cy.log(NEW_USER)
        cy.get('#sign-password').type('test123')
        cy.intercept('**/signup').as('signup')
        cy.get('button').contains('Sign up').click()
        cy.wait('@signup').then(resp => {
            cy.log(JSON.stringify(resp.response.body.errorMessage))
            const errorMessage = JSON.stringify(resp.response.body.errorMessage)
            expect(errorMessage).equal('"This user already exist."')

        })

        // Log in
        cy.clearCookies()
        cy.reload()
        cy.get('#login2').click()
        cy.get('#logInModal .modal-content').should('be.visible')
        cy.get('#loginusername').clear()
        cy.get('#loginusername').click().type(NEW_USER)
        cy.log(NEW_USER)
        cy.get('#loginpassword').type('test123')
        cy.get('button').contains('Log in').click()
        cy.get('#nameofuser').should('contain.text', NEW_USER)

        //  Log out
        cy.get('#login2').should('not.be.visible')
        cy.get('#logout2').click()
        cy.get('#login2').should('be.visible')

        //  Try logging in with invalid user
        cy.clearCookies()
        cy.reload()
        cy.get('#login2').click()
        cy.get('#logInModal .modal-content').should('be.visible')
        cy.get('#loginusername').clear()
        cy.get('#loginusername').click().type('invalid_user')
        cy.get('#loginpassword').type('test123')
        cy.intercept('**/login').as('login')
        cy.get('button').contains('Log in').click()
        cy.wait('@login').then(resp => {
            cy.log(JSON.stringify(resp.response.body))
            const errorMessage = JSON.stringify(resp.response.body.errorMessage)
            expect(errorMessage).equal('"User does not exist."')
        })


    })
})