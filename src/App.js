import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import NewBlog from './components/newBlog'
import Togglable from './components/togglable'
import Login from './components/login'
import {  useDispatch, useSelector } from 'react-redux'
import { addNewBlog,  initBlogs } from './reducers/blogsReducer'
import BlogList from './components/blogList'
import { handleNotification } from './reducers/notificationReducer'
import { connect, disconnect, setUser } from './reducers/userReducer'
import Users from './components/Users'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'

const App = () => {

    const [err, setErr] = useState(true)
    const user = useSelector(state => state.user)
    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initBlogs())
    }, [])

    const handleLogin = async (credObject) => {
        dispatch(connect(credObject))
    }
    const handleLogout = () => {
        dispatch(disconnect())
    }

    const handleCreate = async (newBlog) => {
        try {
            dispatch(addNewBlog(newBlog))
            console.log('createdBlog : ', newBlog)
            addBlogRef.current.toggleVisibility()
            //BlogRef.current.toggleDeleteVisibility()
            setErr(false)
            dispatch(handleNotification(`${newBlog.title} created succesfully !`, 3))
        } catch (error) {
            setErr(true)
            dispatch(handleNotification(error.response.data.error, 4))
        }
    }
    useEffect(() => {
        const userJson = window.localStorage.getItem('userLoggedInBlogsApp')
        if (userJson) {
            const user = JSON.parse(userJson)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [])

    const loginForm = () => {
        return <Login connect={handleLogin} />
    }
    const addBlogRef = useRef()

    //const BlogRef = useRef()

    const createNewForm = () => {
        return (
            <Togglable buttonLabel="add new Blog" ref={addBlogRef}>
                <NewBlog createBlog={handleCreate} />
            </Togglable>
        )
    }
    return (
        <div>
            <h1>Blogs App</h1>
            {notification !== '' ? (
                <Notification message={notification} err={err}></Notification>
            ) : null}

            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <hr></hr>
                    <Router>
                        <Menu user={user} logout={handleLogout}></Menu>
                        <Routes>
                            <Route path='/' element={
                                <div>
                                    {createNewForm()}
                                    <BlogList></BlogList >
                                </div>
                            }>
                            </Route>
                            <Route path='/users' element={<Users></Users>}></Route>
                            <Route path={'/users/:id'} element={<User></User>}></Route>
                            <Route path={'/blogs/:id'} element={<Blog></Blog>}></Route>
                        </Routes>
                    </Router>
                </div>
            )}

        </div>
    )
}

export default App
