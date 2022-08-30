/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { likeTheBlog, deleteTheBlog } from '../reducers/blogsReducer'
import { useParams, useNavigate } from 'react-router-dom'
import AddComment from './AddComment'
const Blog = () => {

    const dispatch  = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const id = useParams().id
    const blog = useSelector(state => state.blogs.find(b => b.id === id))
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
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }


    const likeHandler = () => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id,
        }
        updateLikes(blog.id, updatedBlog)
    }
    const deleteHandler = () => {
        console.log('deleting ', blog, ' created by ', user)
        deleteBlog(blog)
    }
    const blogStyle = {
        paddingTop: 5,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        margin : 'auto',
        marginBottom: 5,
        textAlign : 'center',
        width : '50%'
    }
    const deleteVisible = blog.user.username === user.username
    const showIfIdentiqueUser = { display: deleteVisible ? '' : 'none' }
    if(!blog){
        return null
    }
    return (
        <div style={blogStyle} className="Blog">
            <h4>
                {blog.title}{' '}
            </h4>
            <div className="blogDetails">
                <label>{blog.url}</label>
                <div>
                    <span>likes : {blog.likes}</span>{' '}
                    <button onClick={likeHandler} id="likeButton">
                        like
                    </button>
                </div>
                <div>{blog.author}</div>
                <div style={showIfIdentiqueUser}>
                    <button onClick={deleteHandler} style={{ color: 'red' }}>
                        delete
                    </button>
                </div>
            </div>
            <div>
                <br></br>
                <AddComment blog={blog}></AddComment>
                <h5>comments</h5>
                <ul>
                    {
                        blog.comments.map(c => {
                            return(
                                <li key={c.comment}>
                                    {c.comment}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

Blog.displayName = 'Blog'

export default Blog
