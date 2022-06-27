import { useState } from "react"

const Blog = ({blog, updateLikes}) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDeatailsVisibility = () =>{
    setDetailsVisible(!detailsVisible)
  }

  const likeHandler = () =>{
    const updatedBlog = {
      ...blog, likes : blog.likes + 1, user : blog.user.id
    }
    updateLikes(blog.id, updatedBlog)
  }
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const displayAtt = {display : detailsVisible ? '' : 'none'}
  const buttonLabel = detailsVisible ?'hide' : 'view'
  return (
    <div style={blogStyle}>
      <h4>
        {blog.title}  <button onClick={toggleDeatailsVisibility}>{buttonLabel}</button>
      </h4>
      <div style={displayAtt}>
        <label>{blog.url}</label>
        <p>likes : {blog.likes} <button onClick={likeHandler}>like</button></p>
        <p>{blog.author}</p>
      </div>
    </div>
  )
}

export default Blog