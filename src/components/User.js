import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import ClearAllTwoToneIcon from '@mui/icons-material/ClearAllTwoTone'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Collapse, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
const User = () => {
    const id = useParams().id
    const user = useSelector(state => state.allUsers.find(u => u.id === id))
    const [blogsVisible, setBlogsVisible] = useState(false)

    const handleClick = () => {
        setBlogsVisible(!blogsVisible)
    }
    if (!user){
        return null
    }

    /* return (
        <div style={styleUser}>
            <h2>{user.username}</h2>
            <h3>blogs created : </h3>
            <ul>
                {
                    user.blogs.map(b => <li key={b.id}>{b.title}</li>)
                }
            </ul>
        </div>
    ) */
    return (
        <Container component='main' maxWidth="sm">
            <Card>
                <CardHeader
                    title={user.username}
                    sx={{
                        bgcolor : '#DED',
                        padding : 'auto'
                    }}
                    avatar={
                        <Avatar>
                            <AccountCircleRoundedIcon></AccountCircleRoundedIcon>
                        </Avatar>
                    }
                >

                </CardHeader>
                <CardContent sx={{
                    textAlign : 'center'
                }}>
                    <Typography variant='body1'>{`the name of this user is ${user.name}`}</Typography>
                    <Typography variant='body1'>{`this user had added  ${user.blogs.length} Blogs`}</Typography>
                </CardContent>
                <Divider variant='middle'></Divider>
                <CardActions>
                    <Button
                        variant='text'
                        onClick={handleClick}
                        startIcon = {<ClearAllTwoToneIcon/>}
                    >
                        Blogs Added By {user.name}
                    </Button>
                </CardActions>
                <Divider variant='fullWidth'></Divider>
                <Collapse in={blogsVisible}>
                    <List>
                        {
                            user.blogs.map(b =>
                                <Box key={b.id}>
                                    <ListItem >
                                        <ListItemText
                                            primary = {b.title}
                                            secondary = {`author : ${b.author}`}
                                        />
                                    </ListItem>
                                    <Divider variant='fullWidth'></Divider>
                                </Box>

                            )
                        }
                    </List>
                </Collapse>
            </Card>
        </Container>
    )
}

export default User
