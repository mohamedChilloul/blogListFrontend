import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import { Divider, List, ListItem, ListItemText } from '@mui/material'
const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const newBlogs = blogs.map(b => b)
    const sortedBlogs = newBlogs.sort((a, b) => b.likes - a.likes )

    return (
        <Container component='main' maxWidth="sm">
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper'
                }}>
                {
                    sortedBlogs.map((b) => {
                        return(
                            <Link
                                key={b.id}
                                to={`/blogs/${b.id}`}
                                style={{
                                    textDecoration : 'none',
                                    color : '#000'
                                }}
                            >
                                <ListItem sx={{
                                    backgroundColor : '#FFF',
                                    ':hover' : {
                                        opacity : '80%',
                                        backgroundColor : '#EEF'
                                    }
                                }}  >
                                    <ListItemText
                                        primary={b.title}
                                        secondary={b.author}
                                    />
                                </ListItem>
                                <Divider variant="fullWidth" component="li"></Divider>
                            </Link>

                        )
                    })
                }

            </List>
        </Container>
    )
}

export default BlogList
