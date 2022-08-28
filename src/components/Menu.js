import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ user, logout }) => {
    const style = {
        marginRight : '5px',
        border : '1px solid black',
        borderRadius : '20%'
    }
    const navStyle = {
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: '0.5px solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        display : 'flex',
        flexFlow : 'nowrap row',
        justifyContent : 'space-between'
    }
    return (
        <div style={navStyle}>
            <div>
                <Link to='/' style={style}>blogs</Link>
                <Link to='/users' style={style}>users</Link>
            </div>
            <div>
                {user.name} {'logged in '}
                <button onClick={logout}> logout </button>
            </div>
        </div>
    )
}

export default Menu
