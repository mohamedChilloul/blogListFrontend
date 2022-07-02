describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', {
            username : 'admin',
            name: 'mohamed',
            password : 'root'
        })
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Blogs App')
        cy.contains('log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login  tests ', () => {

        beforeEach(() => {
            console.log('beforeach Login here !')
        })

        it('succes with correct credentials ', () => {
            cy.get('#usernameInp').type('admin')
            cy.get('#passwordInp').type('root')
            cy.get('#loginButton').click()
            cy.contains('mohamed logged in to the app')
        })

        it('fail with wrong credentials ', () => {
            cy.get('#usernameInp').type('admin')
            cy.get('#passwordInp').type('wrong pass')
            cy.get('#loginButton').click()
            cy.should('not.contain', 'mohamed logged in to the app')
            cy.get('.notification').should('contain', 'invalid user name or password')
                .and('have.css','color', 'rgb(255, 0, 0)')
        })
    })
})