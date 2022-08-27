import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsReducer = createSlice({
    name : 'blogs',
    initialState : [],
    reducers : {
        setNewBlog(state, action){
            state.push(action.payload)
        },
        likeBlog(state, action){
            const newObj = action.payload
            return state.map(blog => blog.id !== newObj.id ? blog : newObj)
        },
        setBlogs(state, action){
            return action.payload
        },
        deleteBlogFromState(state, action){
            let id = action.payload
            return (state.filter(b => b.id !== id))
        }
    }
})

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const addNewBlog = (blog) => {
    return async dispatch => {
        const createdBlog = await blogService.createNewBlog(blog)
        dispatch(setNewBlog(createdBlog))
    }
}

export const likeTheBlog = (id, newObject) => {
    return async dispatch => {
        const updatedBlog = await blogService.updateLikes(id, newObject)
        dispatch(likeBlog(updatedBlog))
    }
}

export const deleteTheBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch(deleteBlogFromState(id))
    }
}
export const { setNewBlog, likeBlog, setBlogs, deleteBlogFromState } = blogsReducer.actions

export default blogsReducer.reducer