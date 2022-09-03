/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { likeTheBlog, deleteTheBlog } from '../reducers/blogsReducer'
import { useParams, useNavigate } from 'react-router-dom'
import AddComment from './AddComment'
import { Box, Divider, List, ListItem, ListItemText, Container, Card, CardContent, Typography, Button, CardActions, Collapse } from '@mui/material'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone'
import ModeCommentTwoToneIcon from '@mui/icons-material/ModeCommentTwoTone'
import { useState } from 'react'
const Blog = () => {

    const dispatch  = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const id = useParams().id
    const blog = useSelector(state => state.blogs.find(b => b.id === id))

    const updateLikes = async (id, newBlog) => {
        try {
            dispatch(likeTheBlog(id, newBlog))
        } catch (error) {
            console.log(error)
        }
    }

    const deleteBlog = async (blog) => {
        try {
            if (window.confirm(`do you want to delete ${blog.title} ?`)) {
                dispatch(deleteTheBlog(blog.id))
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }


    const likeHandler = () => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id,
        }
        updateLikes(blog.id, updatedBlog)
    }
    const deleteHandler = () => {
        console.log('deleting ', blog, ' created by ', user)
        deleteBlog(blog)
    }
    const [commentsVisible, setCoomentsVisible] = useState(false)

    const handleShow = () => {
        setCoomentsVisible(!commentsVisible)
    }
    const deleteVisible = blog.user.username === user.username
    const showIfIdentiqueUser = { display: deleteVisible ? '' : 'none' }
    if(!blog){
        return null
    }
    return (
        <Container component='main' maxWidth="sm">
            <Card>
                <CardContent>
                    <Box sx={{
                        textAlign : 'center',
                        background : '#EEE',
                        mb :4
                    }}>
                        <Typography component='h2' variant='h3'>{blog.title}</Typography>
                    </Box>
                    <Box>
                        <Typography variant='body1'>{blog.url}</Typography>
                        <Typography variant='body1'>likes : {blog.likes}</Typography>
                        <Typography variant='body1'>{blog.author}</Typography>
                    </Box>

                </CardContent>
                <CardActions>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={likeHandler}
                        id='likeButton'
                        fullWidth
                        startIcon={<ThumbUpTwoToneIcon/>}
                    >
                            Like
                    </Button>
                    <Button
                        variant='outlined'
                        fullWidth
                        onClick={handleShow}
                        startIcon={<ModeCommentTwoToneIcon/>}
                    >
                        {commentsVisible ? 'hide Cmnts' : 'show Comnts'}
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={deleteHandler}
                        id='deleteButton'
                        fullWidth
                        startIcon={<DeleteTwoToneIcon />}
                        sx={{
                            visibility : showIfIdentiqueUser
                        }}>
                            Delete
                    </Button>
                </CardActions>
                <Divider variant='fullWidth'></Divider>
                <Collapse in={commentsVisible} timeout="auto" unmountOnExit>
                    <Box>
                        <AddComment blog={blog}></AddComment>
                        <List sx={{
                            display : 'flex',
                            flexDirection : 'column',
                            alignItems  :'center'
                        }}>
                            {
                                blog.comments.map(c => {
                                    return(
                                        <Box key={c.comment}>
                                            <ListItem>
                                                <ListItemText
                                                    primary={c.comment}
                                                />
                                            </ListItem>
                                            <Divider variant='center'></Divider>
                                        </Box>
                                    )
                                })
                            }
                        </List>
                    </Box>
                </Collapse>
            </Card>
        </Container>
    )
}

Blog.displayName = 'Blog'

export default Blog
