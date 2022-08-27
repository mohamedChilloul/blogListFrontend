import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
    name : 'notification',
    initialState : '',
    reducers : {
        setNotification(state, action){
            return action.payload
        },
        removeNotification(){
            return ''
        }
    }
})

let timeout

export const { setNotification, removeNotification } = notificationReducer.actions

export const handleNotification = (message, time) => {
    return async dispatch => {
        clearTimeout(timeout)
        dispatch(setNotification(message))
        timeout = setInterval(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }
}

export default notificationReducer.reducer