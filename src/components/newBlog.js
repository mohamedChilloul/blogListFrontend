import { useField } from '../hooks'
import Container from '@mui/material/Container'
import { Avatar, Box, Button, CssBaseline, TextField, Typography } from '@mui/material'
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined'

const NewBlog = ({ createBlog }) => {

    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const handleCreate = (e) => {
        e.preventDefault()
        createBlog({
            title : title.value,
            author : author.value,
            url : url.value
        })
    }
    return(
        <Container component='main' maxWidth="xs">
            <CssBaseline></CssBaseline>
            <Box sx={{
                display : 'flex',
                flexDirection : 'column',
                alignItems : 'center'
            }}>
                <Avatar sx={{ m: 1, bgcolor: 'Highlight' }}>
                    <PostAddOutlinedIcon/>
                </Avatar>
                <Typography component='h1' variant="h4" color="initial">Add New Blog</Typography>
            </Box>
            <Box
                component='form'
                onSubmit={handleCreate}
                xs={{
                    display : 'flex',
                    flexDirection : 'column',
                    mt : 8,
                    alignItems : 'center'
                }}
            >
                <TextField
                    fullWidth
                    autoFocus
                    margin='normal'
                    id="titleInp"
                    label="Title"
                    {...title}
                />
                <TextField
                    fullWidth
                    margin='normal'
                    id="authorInp"
                    label="Author"
                    {...author}
                />
                <TextField
                    fullWidth
                    margin='normal'
                    id="urlInp"
                    label="Url"
                    {...url}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type='submit'
                    id='createButton'
                    sx={{
                        mt : 3,
                        mb : 2
                    }}>
                    Create
                </Button>
            </Box>
        </Container>
    )
}

export default NewBlog