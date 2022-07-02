import { useState } from 'react'
const Login = ({ connect }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleLogin = (e) => {
        e.preventDefault()
        connect({
            username,
            password
        })
        setUsername('')
        setPassword('')
    }
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

export default Login