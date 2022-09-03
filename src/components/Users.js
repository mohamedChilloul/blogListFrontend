import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initUsers } from '../reducers/allUsersReducer'
import { Link } from 'react-router-dom'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
const Users = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initUsers())
    }, [])
    const users = useSelector(state => state.allUsers)
    console.log('users : ',users)

    return (
        <TableContainer component={Paper} sx={{
            width : '70%',
            margin : 'auto'
        }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>username</TableCell>
                        <TableCell>blogs created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map(u =>
                            <TableRow
                                key={u.username}
                                sx={{
                                    ':hover' : {
                                        backgroundColor : '#DED'
                                    }
                                }}
                            >
                                <TableCell>
                                    <Link
                                        to={`/users/${u.id}`}
                                        style={{
                                            textDecoration : 'none',
                                            color : '#000'
                                        }}
                                    >
                                        {u.username}
                                    </Link>
                                </TableCell>
                                <TableCell>{u.blogs.length}</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Users
