import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { commentTheBlog } from '../reducers/blogsReducer'
const AddComment = ({ blog }) => {

    const comment = useField('text')
    const dispatch = useDispatch()
    const handleComment = (e) => {
        e.preventDefault()
        dispatch(commentTheBlog(blog.id, { comment : comment.value }))
    }
    return (
        <div>
            <form onSubmit={handleComment}>
                <input placeholder='add comment' {...comment}></input>
                <button type='submit'>add</button>
            </form>

        </div>
    )
}

export default AddComment
