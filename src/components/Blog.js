import { useState } from "react"

const Blog = ({blog}) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDeatailsVisibility = () =>{
    setDetailsVisible(!detailsVisible)
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
        <p>likes : {blog.likes} <button>like</button></p>
        <p>{blog.author}</p>
      </div>
    </div>
  )
}

export default Blog