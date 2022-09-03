import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Avatar, Box, Button, Container, CssBaseline } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useField } from '../hooks'

const Login = ({ connect }) => {

    const username = useField('text')
    const password = useField('text')

    const handleLogin = (e) => {
        e.preventDefault()
        connect({
            username: username.value,
            password: password.value
        })
    }
    return(
        <Container component='main' maxWidth="xs">
            <Box component='form' onSubmit={handleLogin} xs={{
                display : 'flex',
                flexDirection : 'column',
                mt : 8,
                alignItems : 'center'
            }}>
                <CssBaseline></CssBaseline>
                <Box sx={{
                    display : 'flex',
                    flexDirection : 'column',
                    alignItems : 'center'
                }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant="h4" color="initial">Log In</Typography>
                </Box>

                <TextField
                    fullWidth
                    autoFocus
                    margin='normal'
                    id="usernameInp"
                    label="username"
                    {...username}
                />
                <TextField
                    fullWidth
                    margin='normal'
                    id="passwordInp"
                    label="password"
                    {...password}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type='submit'
                    id='loginButton'
                    sx={{
                        mt : 3,
                        mb : 2
                    }}>
                    submit
                </Button>
            </Box>
        </Container>
    )
}

export default Login