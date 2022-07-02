import React from 'react'

const Notification = ({ message, err }) => {
    const clr = err ? 'red' : 'green'
    const style = {
        color: clr,
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }
    return(
        <div style={style} className='notification'>
            {message}
        </div>
    )
}

export default Notification