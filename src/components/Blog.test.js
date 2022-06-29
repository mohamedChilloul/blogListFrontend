import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('testing the Blog component : ', () => {
    let container
    let updateLikes = jest.fn()

    beforeEach(() => {

        const blog = {
            title : 'test blog title',
            author : 'author of test blog',
            url : 'http://localhost:3001/api/blogs',
            likes: 11,
            user : {
                username : 'mohamed'
            }
        }
        container  = render(<Blog blog={blog} user='mohamed' updateLikes={updateLikes}></Blog>).container
    })

    test('blog details not displayed by default : ', () => {

        const div = container.querySelector('.blogDetails')
        expect(div).toHaveStyle('display : none')
        const title = screen.getByText('test blog title')
        expect(title).toBeDefined()

    })

    test('details of the blog shown when button clicked ', async () => {

        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        const div = container.querySelector('.blogDetails')
        expect(div).not.toHaveStyle('display : none')
    })

    test('testing the like-button handler ', async () => {

        const likeButton = screen.getByText('like')
        const user = userEvent.setup()
        await user.click(likeButton)
        await user.click(likeButton)

        expect(updateLikes.mock.calls).toHaveLength(2)
    })
})