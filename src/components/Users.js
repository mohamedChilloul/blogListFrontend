import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initUsers } from '../reducers/allUsersReducer'
import { Link } from 'react-router-dom'
const Users = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initUsers())
    }, [])
    const users = useSelector(state => state.allUsers)
    console.log('users : ',users)
    return (
        <div>
            <h2>Users</h2>
            <table style={{
                'border' : '1px solid gray',
                'textAlign' : 'center'
            }}>
                <thead>
                    <tr>
                        <td>username</td>
                        <td>blogs created</td>
                    </tr>

                </thead>
                <tbody>
                    {
                        users.map(u => {
                            return(
                                <tr key={u.username}>
                                    <td><Link to={`/users/${u.id}`}>{u.username}</Link></td>
                                    <td>{u.blogs.length}</td>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>

            </table>

        </div>
    )
}

export default Users
