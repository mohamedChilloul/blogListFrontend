import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'

const Menu = ({ user, logout }) => {
    const style = {
        marginRight : '5px',
        textDecoration : 'none',
        color : '#333',
        padding : 3,
        borderRadius : 50,
        ':hover' : {
            backgroundColor : '#DDD'
        },
        backgroundColor : '#fff'
    }
    const navStyle = {
        backgroundColor: '#DED',
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
                <Button variant='outlined' onClick={logout} endIcon={<LogoutIcon/>} sx={{
                    ml : 2
                }}> logout </Button>
            </div>
        </div>
    )
}

export default Menu
