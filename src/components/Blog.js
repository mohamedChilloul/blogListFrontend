import { useState } from 'react'

const Blog = (props) => {
    const { blog, updateLikes, user, deleteBlog, deleteVisible } = props
    const [detailsVisible, setDetailsVisible] = useState(false)
    console.log('deletVisible : ',deleteVisible)

    const toggleDeatailsVisibility = () => {
        setDetailsVisible(!detailsVisible)
    }


    /* useImperativeHandle(refs, () => {
        return{
            toggleDeleteVisibility
        }
    }) */
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
    const showIfIdentiqueUser = { display : deleteVisible ? '': 'none' }
    return (
        <div style={blogStyle} className='Blog'>
            <h4>
                {blog.title}  <button onClick={toggleDeatailsVisibility}>{buttonLabel}</button>
            </h4>
            <div style={displayAtt} className='blogDetails'>
                <label>{blog.url}</label>
                <p>likes : {blog.likes} <button onClick={likeHandler}>like</button></p>
                <p>{blog.author}</p>
                <div style={showIfIdentiqueUser}>
                    <button onClick={deleteHandler} style={{ color : 'red' }}>delete</button>
                </div>
            </div>

        </div>
    )
}

Blog.displayName='Blog'

export default Blog