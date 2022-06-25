import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
  const handleLogin = async (e) =>{
    e.preventDefault()
    //console.log(username, password)
    try {
      const user = await loginService.login({
        username,
        password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }
  const loginForm = ()=>{
    return(
      <div>
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
          <label>username</label>
          <input value={username} onChange={handleUsername}></input>
          <br></br>
          <label>password</label>
          <input value={password} onChange={handlePassword}></input>
          <br></br>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {
        user === null ? loginForm():
        <div>
          <p>{user.name} logged in to the app !</p>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
      
    </div>
  )
}

export default App
