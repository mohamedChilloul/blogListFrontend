Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('userLoggedInBlogsApp', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})


Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { title, author, url },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('userLoggedInBlogsApp')).token}`
        }
    })

    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createUser', ({ username, name, password }) => {
    cy.request({
        url: 'http://localhost:3003/api/users',
        method: 'POST',
        body: { username, name, password }
    })

    cy.visit('http://localhost:3000')
})