import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './newBlog'

test('<Blog /> updates parent state and calls onSubmit', async () => {

    const createBlog = jest.fn()
    const user = userEvent.setup()
    render(<NewBlog createBlog={createBlog}/>).container

    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('create')

    await user.type(inputs[0], 'testing title')
    await user.type(inputs[1], 'testing author')
    await user.type(inputs[2], 'testing url')

    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    console.log(createBlog.mock.calls)
    expect(createBlog.mock.calls[0][0].title).toBe('testing title')

})