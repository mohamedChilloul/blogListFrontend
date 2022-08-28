import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
const User = () => {
    const id = useParams().id
    const user = useSelector(state => state.allUsers.find(u => u.id === id))
    if (!user){
        return null
    }
    return (
        <div>
            <h2>{user.username}</h2>
            <h3>blogs created : </h3>
            <ul>
                {
                    user.blogs.map(b => <li key={b.id}>{b.title}</li>)
                }
            </ul>
        </div>
    )
}

export default User
