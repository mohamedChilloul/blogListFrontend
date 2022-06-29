import { useState } from 'react'

const Blog = ({ blog, updateLikes, user, deleteBlog }) => {
    const [detailsVisible, setDetailsVisible] = useState(false)

    const toggleDeatailsVisibility = () => {
        setDetailsVisible(!detailsVisible)
    }

    const likeHandler = () => {
        const updatedBlog = {
            ...blog, likes : blog.likes + 1, user : blog.user.id
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
        marginBottom: 5
    }
    const displayAtt = { display : detailsVisible ? '' : 'none' }
    const buttonLabel = detailsVisible ?'hide' : 'view'
    const showIfIdentiqueUser = { display : user === blog.user.username ? '': 'none' }
    return (
        <div style={blogStyle}>
            <h4>
                {blog.title}  <button onClick={toggleDeatailsVisibility}>{buttonLabel}</button>
            </h4>
            <div style={displayAtt} className='blogDetails'>
                <label>{blog.url}</label>
                <p>likes : {blog.likes} <button onClick={likeHandler}>like</button></p>
                <p>{blog.author}</p>
                <div style={showIfIdentiqueUser}>
                    <button onClick={deleteHandler}>delete</button>
                </div>
            </div>

        </div>
    )
}

export default Blog