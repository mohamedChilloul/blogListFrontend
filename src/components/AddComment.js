import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { commentTheBlog } from '../reducers/blogsReducer'
import { Box, Button, TextField } from '@mui/material'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
const AddComment = ({ blog }) => {

    const comment = useField('text')
    const dispatch = useDispatch()
    const handleComment = (e) => {
        e.preventDefault()
        dispatch(commentTheBlog(blog.id, { comment : comment.value }))
    }

    return(

        <Box component='form' onSubmit={handleComment} sx={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'space-around',
            mt : 4,
        }}>
            <Box sx={{
                width : '65%'
            }}>
                <TextField
                    fullWidth
                    id="comment"
                    label="comment"
                    {...comment}
                />
            </Box>
            <Box sx={{
                width : '30%',
            }}>
                <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    type='submit'
                    id='commentButton'
                    endIcon={<SendTwoToneIcon/>}
                >
                    send
                </Button>
            </Box>
        </Box>
    )
}

export default AddComment
