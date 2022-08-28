import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const newBlogs = blogs.map(b => b)
    const sortedBlogs = newBlogs.sort((a, b) => b.likes - a.likes )
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
    return (
        <div style={{
            display : 'flex',
            flexDirection : 'column'
        }}>
            <br></br>

            {
                sortedBlogs.map(b => {
                    return(
                        <div key={b.id} style={blogStyle}>
                            <Link to={`/blogs/${b.id}`}>
                                {b.title}
                            </Link>
                        </div>
                    )
                })
            }


        </div>
    )
}

export default BlogList
