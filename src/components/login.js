
const Login = ({
    handleLogin,
    handlePassword,
    handleUsername,
    username,
    password
}) =>{
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