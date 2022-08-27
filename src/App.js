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

const App = () => {

    const [err, setErr] = useState(true)
    const user = useSelector(state => state.user)
    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initBlogs())
    }, [dispatch])

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
                    <div>
                        <p>
                            {user.name} logged in to the app !{' '}
                            <button onClick={handleLogout}>logout</button>
                        </p>
                        {createNewForm()}
                    </div>

                    <div>
                        <BlogList user={user}></BlogList >
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
