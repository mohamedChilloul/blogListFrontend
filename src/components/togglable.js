import { useState, forwardRef, useImperativeHandle } from 'react'
import propTypes from 'prop-types'
import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/AddBoxTwoTone'
import DisabledIcon from '@mui/icons-material/DisabledByDefaultTwoTone'
const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display : visible ? 'none' : '' }
    const showWhenVisible = { display : visible ? '' : 'none' }

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(refs, () => {
        return{
            toggleVisibility
        }
    })

    return (
        <Box sx={{
            display : 'flex',
            flexDirection  : 'row',
            justifyContent : 'center'
        }}>
            <Box style={hideWhenVisible}>
                <Button onClick={toggleVisibility} variant='outlined' fullWidth startIcon={<AddIcon/>}>
                    {props.buttonLabel}
                </Button>
            </Box>
            <Box style={showWhenVisible}>
                {props.children}
                <Button onClick={toggleVisibility} variant='outlined' color='error'  startIcon={<DisabledIcon/>}>
                    cancle
                </Button>
            </Box>
        </Box>
    )
})
Togglable.propTypes = {
    buttonLabel :propTypes.string.isRequired
}
Togglable.displayName = 'Togglable'

export default Togglable