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

    describe('when user logged In', () => {

        beforeEach(() => {
            cy.login({ username : 'admin', password : 'root' })
        })

        it('a blog can be created ' , () => {
            cy.contains('add new Blog').click()
            cy.get('#titleInp').type('titre de Blog')
            cy.get('#authorInp').type('auteur de Blog')
            cy.get('#urlInp').type('url de Blog')
            cy.get('#createButton').click()
            cy.get('.Blog').should('contain','titre de Blog')
        })

        describe('and many blogs are created ', () => {

            beforeEach(() => {
                cy.createBlog({
                    title : 'titre Blog 1',
                    author : 'auteur Blog 1',
                    url : 'http://example.io'
                })
                cy.createBlog({
                    title : 'titre Blog 2',
                    author : 'auteur Blog 2',
                    url : 'http://example.io'
                })
                cy.createBlog({
                    title : 'titre Blog 3',
                    author : 'auteur Blog 3',
                    url : 'http://example.io'
                })
                cy.contains('titre Blog 1').contains('view').click()
            })

            it('users can like a blog ', () => {
                cy.get('#likeButton').click().parent().find('span').should('contain', 'likes : 1')
            })

            it('user can delete a blog',  () => {
                cy.contains('delete').click()
                cy.should('not.contain', 'titre Blog 1')
            })

            it('other user can not delete a blog', () => {
                cy.createUser({
                    username : 'otherUser',
                    name : 'nameOfOtherUser',
                    password : 'pass'
                })
                window.localStorage.clear()
                cy.login({ username : 'otherUser', password : 'pass' })
                cy.contains('nameOfOtherUser logged in to the app')
                cy.contains('view').click()
                cy.should('not.contain', 'delete')

            })
        })
    })
})