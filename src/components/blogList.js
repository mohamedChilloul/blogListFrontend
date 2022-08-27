import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTheBlog, likeTheBlog } from '../reducers/blogsReducer'
import Blog from './Blog'
const BlogList = ({ user }) => {
    const blogs = useSelector(state => state.blogs)
    console.log(blogs)
    const newBlogs = blogs.map(b => b)
    const sortedBlogs = newBlogs.sort((a, b) => b.likes - a.likes )
    const dispatch  = useDispatch()
    const updateLikes = async (id, newBlog) => {
        try {
            dispatch(likeTheBlog(id, newBlog))
        } catch (error) {
            console.log(error)
        }
    }

    const deleteBlog = async (blog) => {
        try {
            if (window.confirm(`do you want to delete ${blog.title} ?`)) {
                dispatch(deleteTheBlog(blog.id))
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <br></br>
            <hr></hr>
            {
                sortedBlogs.map(blog => <Blog
                    key={blog.id}
                    blog={blog}
                    updateLikes={updateLikes}
                    user={user.username}
                    deleteBlog={deleteBlog}
                    deleteVisible={
                        blog.user.username === user.username
                    }
                />)
            }

        </div>
    )
}

export default BlogList
