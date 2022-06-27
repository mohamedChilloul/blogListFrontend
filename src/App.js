import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlog from './components/newBlog'
import Togglable from './components/togglable'
import Login from './components/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [err, setErr] = useState(true)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleUsername = (e) =>{
    setUsername(e.target.value)
  }
  const handlePassword = (e) =>{
    setPassword(e.target.value)
  }
  const handleTitle = (e) =>{
    setTitle(e.target.value)
  }
  const handleAuthor = (e) =>{
    setAuthor(e.target.value)
  }
  const handleUrl = (e) =>{
    setUrl(e.target.value)
  }
  const handleLogin = async (e) =>{
    e.preventDefault()
    //console.log(username, password)
    try {
      const user = await loginService.login({
        username,
        password
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('userLoggedInBlogsApp', JSON.stringify(user))
      setUsername('')
      setPassword('')
      setMessage(`${user.name} connected succesfully !`)
      setErr(false)
      setTimeout(()=>{
        setMessage(null)
      }, 4000)
    } catch (error) {
      setMessage(error.response.data.error)
      setErr(true)
      setTimeout(()=>{
        setMessage(null)
      }, 4000)
    }
  }
  const handleLogout = () =>{
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreate = async (e) =>{
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    try {
      const createdBlog = await blogService.createNewBlog(newBlog)
      addBlogRef.current.toggleVisibility()
      setBlogs(blogs.concat(createdBlog))
      setMessage(`${createdBlog.title} created succesfully !`)
      setErr(false)
      setTimeout(()=>{
        setMessage(null)
      }, 4000)
    } catch (error) {
      setMessage(error.response.data.error)
      setErr(true)
      setTimeout(()=>{
        setMessage(null)
      }, 4000)
    }
    
  }
  useEffect(() =>{
    const userJson = window.localStorage.getItem('userLoggedInBlogsApp')
    if(userJson){
      const user = JSON.parse(userJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = ()=>{
    return(
      <Togglable buttonLabel='login to App'>
        <Login
        handleLogin={handleLogin}
        handlePassword={handlePassword}
        handleUsername={handleUsername}
        username={username}
        password={password}
      />
      </Togglable>
      
    )
  }
  const addBlogRef = useRef()
  const createNewForm = () => {
    return (
      <Togglable buttonLabel= 'add new Blog' ref={addBlogRef}>
        <NewBlog handleCreate={handleCreate} author={author}
               handleAuthor={handleAuthor}
               title={title} handleTitle={handleTitle}
               url={url} handleUrl={handleUrl}
        />
      </Togglable>
      
    )
  }
  return (
    
    <div>
      <h1>Blogs App</h1>
      {
        message !== null?<Notification message={message} err={err}></Notification>:null
      }
      
      {
        user === null ? loginForm():
        <div>
          <h2>blogs App</h2>
          <div>
            <p>{user.name} logged in to the app ! <button onClick={handleLogout}>logout</button></p>
            {createNewForm()}
          </div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
      
    </div>
  )
}

export default App
