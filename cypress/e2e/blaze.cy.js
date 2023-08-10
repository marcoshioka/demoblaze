/// <reference types="cypress" />

const NEW_USER = '-'+ Date.now()

describe('Demo Blaze', () => {
    it('Test 1', () => {

        //  Go to https://www.demoblaze.com/
        cy.visit("https://www.demoblaze.com/")

        // Sign Up as a new user
        cy.get('#signin2').click()
        cy.get('#signInModal .modal-content').should('be.visible')
        cy.get('#sign-username').clear()
        cy.get('#sign-username').click().type(Cypress.currentTest.title + NEW_USER)
        cy.log(Cypress.currentTest.title + NEW_USER)
        cy.get('#sign-password').type('test123')
        cy.get('button').contains('Sign up').click()

        // Validate if you try signup with same user modal will appear
        cy.clearCookies()
        cy.reload()
        cy.get('#signin2').click()
        cy.get('#signInModal .modal-content').should('be.visible')
        cy.get('#sign-username').clear()
        cy.get('#sign-username').click().type(Cypress.currentTest.title + NEW_USER)
        cy.log(Cypress.currentTest.title + NEW_USER)
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
        cy.get('#loginusername').click().type(Cypress.currentTest.title + NEW_USER)
        cy.log(Cypress.currentTest.title + NEW_USER)
        cy.get('#loginpassword').type('test123')
        cy.get('button').contains('Log in').click()
        cy.get('#nameofuser').should('contain.text', Cypress.currentTest.title + NEW_USER)

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

    it('Test 2', () => {

        //  Log in
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit("https://www.demoblaze.com/")

        cy.get('#signin2').click()
        cy.get('#signInModal .modal-content').should('be.visible')
        cy.get('#sign-username').clear()
        cy.get('#sign-username').click().type(Cypress.currentTest.title + NEW_USER)
        cy.log(Cypress.currentTest.title + NEW_USER)
        cy.get('#sign-password').type('test123')
        cy.get('button').contains('Sign up').click()

        cy.get('#login2').click()
        cy.get('#logInModal .modal-content').should('be.visible')
        cy.get('#loginusername').clear()
        cy.get('#loginusername').click().type(Cypress.currentTest.title + NEW_USER)
        cy.log(Cypress.currentTest.title + NEW_USER)
        cy.get('#loginpassword').type('test123')
        cy.get('button').contains('Log in').click()
        cy.get('#nameofuser').should('contain.text', Cypress.currentTest.title + NEW_USER)

        // Go to Phones
        cy.get('a[id="itemc"]').contains('Phones').click()

        // Click on Any phone
        cy.get('div[class="card h-100"]').first().click()

        // Add to cart
        cy.intercept('**/addtocart').as('addtocart')
        cy.get('div [onclick="addToCart(1)"]').click()
        cy.wait('@addtocart').then(resp => {
            cy.log(JSON.stringify(resp.response.body))
            expect(resp.response.statusCode).equal(200)
        })

        // Go to another phone and add it to cart
        cy.visit('/')
        cy.get('a[id="itemc"]').contains('Phones').click()
        cy.get('div[class="card h-100"]').last().click()
        cy.intercept('**/addtocart').as('addtocart2')
        cy.get('a[class="btn btn-success btn-lg"]').click()
        cy.wait('@addtocart2').then(resp => {
            cy.log(JSON.stringify(resp.response.body))
            expect(resp.response.statusCode).equal(200)
        })

        // Go to cart and remove one item
        cy.get('#cartur').click()
        cy.get('td a').should('have.length', 2)
        cy.get('td a').contains('Delete').last().click()
        cy.get('td a').should('have.length', 1)
        cy.get('#totalp').as('totalamount')

        // Place order and populate modal
        cy.get('button[data-target="#orderModal"]').click()

        cy.get('#name').type('Name ' + Cypress.currentTest.title + NEW_USER)
        cy.get('#country').type('Brazil')
        cy.get('#city').type('São Paulo')
        cy.get('#card').type(Date.now())
        cy.get('#month').type('01')
        cy.get('#year').type('2024')

    })

    it('Test 3', () => {

        //  Log in
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit("https://www.demoblaze.com/")

        cy.get('#signin2').click()
        cy.get('#signInModal .modal-content').should('be.visible')
        cy.get('#sign-username').clear()
        cy.get('#sign-username').click().type(Cypress.currentTest.title + NEW_USER)
        cy.log(Cypress.currentTest.title + NEW_USER)
        cy.get('#sign-password').type('test123')
        cy.get('button').contains('Sign up').click()

        cy.get('#login2').click()
        cy.get('#logInModal .modal-content').should('be.visible')
        cy.get('#loginusername').clear()
        cy.get('#loginusername').click().type(Cypress.currentTest.title + NEW_USER)
        cy.log(Cypress.currentTest.title + NEW_USER)
        cy.get('#loginpassword').type('test123')
        cy.get('button').contains('Log in').click()
        cy.get('#nameofuser').should('contain.text', Cypress.currentTest.title + NEW_USER)

        // Go to Phones
        cy.get('a[id="itemc"]').contains('Phones').click()

        // Click on Any phone
        cy.get('div[class="card h-100"]').first().click()

        // Add to cart
        cy.intercept('**/addtocart').as('addtocart')
        cy.get('div [onclick="addToCart(1)"]').click()
        cy.wait('@addtocart').then(resp => {
            cy.log(JSON.stringify(resp.response.body))
            expect(resp.response.statusCode).equal(200)
        })

        // Go to another phone and add it to cart
        cy.visit('/')
        cy.get('a[id="itemc"]').contains('Phones').click()
        cy.get('div[class="card h-100"]').last().click()
        cy.intercept('**/addtocart').as('addtocart2')
        cy.get('a[class="btn btn-success btn-lg"]').click()
        cy.wait('@addtocart2').then(resp => {
            cy.log(JSON.stringify(resp.response.body))
            expect(resp.response.statusCode).equal(200)
        })

        // Go to cart and remove one item
        cy.get('#cartur').click()
        cy.get('td a').should('have.length', 2)
        cy.get('td a').contains('Delete').last().click()
        cy.get('td a').should('have.length', 1)
        cy.get('#totalp').as('totalamount')

        // Place order and populate modal
        cy.get('button[data-target="#orderModal"]').click()

        cy.get('#name').type('Name ' + Cypress.currentTest.title + NEW_USER)
        cy.get('#country').type('Brazil')
        cy.get('#city').type('São Paulo')
        cy.get('#card').type(Date.now())
        cy.get('#month').type('01')
        cy.get('#year').type('2024')

        // Validate charged information is correct as well as other info in confirmation popup
        cy.get('button[onclick="purchaseOrder()"]').click()
        cy.get('p[class="lead text-muted "]').contains('Amount').invoke('text').then($purchaseInfo => {
            cy.log($purchaseInfo)
            cy.get('@totalamount').invoke('text').then(total => {
                cy.log(total)
                expect($purchaseInfo).to.contains(total)
            })
        })




    })

    it('Test 4', () => {

        //  Log in
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit("https://www.demoblaze.com/")

        cy.get('#signin2').click()
        cy.get('#signInModal .modal-content').should('be.visible')
        cy.get('#sign-username').clear()
        cy.get('#sign-username').click().type(Cypress.currentTest.title + NEW_USER)
        cy.log(Cypress.currentTest.title + NEW_USER)
        cy.get('#sign-password').type('test123')
        cy.get('button').contains('Sign up').click()

        cy.get('#login2').click()
        cy.get('#logInModal .modal-content').should('be.visible')
        cy.get('#loginusername').clear()
        cy.get('#loginusername').click().type(Cypress.currentTest.title + NEW_USER)
        cy.log(Cypress.currentTest.title + NEW_USER)
        cy.get('#loginpassword').type('test123')
        cy.get('button').contains('Log in').click()
        cy.get('#nameofuser').should('contain.text', Cypress.currentTest.title + NEW_USER)

        //  Go to main categories level page (category tab on left)
        cy.get('#cat').click()

        //  Now go to each sub-category level
        cy.get('#itemc').contains('Phones').click()
        cy.get('#tbodyid div[class="card-block"] a').then(($phones) => {
            cy.log($phones.text())
            global.phones = $phones.text()
        }
        )

        cy.get('#cat').click()
        cy.get('a[id="itemc"]').contains('Laptops').click()
        cy.get('#tbodyid div[class="card-block"] a').then(($laptops) => {
            cy.log($laptops.text())
            global.laptops = $laptops.text()
        }
        )

        cy.get('#cat').click()
        cy.get('a[id="itemc"]').contains('Monitors').click()
        cy.get('#tbodyid div[class="card-block"] a').then(($monitors) => {
            cy.log($monitors.text())
            global.monitors = $monitors.text()
        }
        )

        //  Validate that main category level page contains all items from subcategories

        cy.get('#cat').click()
        cy.get('#tbodyid div[class="card-block"] a').then($all => {
            cy.log($all.text())
            cy.get('#tbodyid div[class="card-block"] a').then(item => {
                const item01 = item.eq(1).text()
                const item02 = item.eq(2).text()
                const item03 = item.eq(3).text()
                const item04 = item.eq(4).text()
                const item05 = item.eq(5).text()
                const item06 = item.eq(6).text()
                const item07 = item.eq(7).text()
                const item08 = item.eq(8).text()
                const item09 = item.eq(9).text()
                cy.log(item01)
                cy.log(item02)
                cy.log(item03)
                cy.log(item04)
                cy.log(item05)
                cy.log(item06)
                cy.log(item07)
                cy.log(item08)
                cy.log(item09)
                const allItems = phones + laptops + monitors
                expect(allItems).to.contain(item01)
                expect(allItems).to.contain(item02)
                expect(allItems).to.contain(item03)
                expect(allItems).to.contain(item04)
                expect(allItems).to.contain(item05)
                expect(allItems).to.contain(item06)
                expect(allItems).to.contain(item07)
                expect(allItems).to.contain(item08)
                expect(allItems).to.contain(item09)


                cy.intercept('**/pagination').as('pagination')
                cy.get('#next2').click()
                cy.get('#tbodyid div[class="card-block"] a', { timeout: 8000 }).should('be.visible')

                cy.wait('@pagination').then(pagination => {
                    cy.log(JSON.stringify(pagination.response.body.Items))
                    cy.log(JSON.stringify(pagination.response.body.Items[0].title))
                    cy.log(JSON.stringify(pagination.response.body.Items[1].title))
                    cy.log(JSON.stringify(pagination.response.body.Items[2].title))
                    cy.log(JSON.stringify(pagination.response.body.Items[3].title))
                    cy.log(JSON.stringify(pagination.response.body.Items[4].title))
                    cy.log(JSON.stringify(pagination.response.body.Items[5].title))
                    5
                    const item10 = pagination.response.body.Items[0].title
                    const item11 = pagination.response.body.Items[1].title
                    const item12 = pagination.response.body.Items[2].title
                    const item13 = pagination.response.body.Items[3].title
                    const item14 = pagination.response.body.Items[4].title
                    const item15 = pagination.response.body.Items[5].title

                    expect(allItems).to.contain(item10)
                    expect(allItems).to.contain(item11)
                    expect(allItems).to.contain(item12)
                    expect(allItems).to.contain(item13)
                    expect(allItems).to.contain(item14)
                    expect(allItems).to.contain(item15)

                })
            })
        })

    })

})
