import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { handleNotification } from './notificationReducer'
const userReducer = createSlice({
    name : 'user',
    initialState : null,
    reducers : {
        setUser(state, action){
            return action.payload
        },
        deleteUser(){
            return null
        }
    }
})

export const { setUser, deleteUser } = userReducer.actions
export default userReducer.reducer

export const connect = (credantials) => {
    return async dispatch => {
        try {
            const user = await loginService.login(credantials)
            dispatch(setUser(user))
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'userLoggedInBlogsApp',
                JSON.stringify(user)
            )
            dispatch(handleNotification(`${user.name} connected succesfully !`, 3))

        } catch (error) {
            dispatch(handleNotification(error.response.data.error, 4))
        }
    }
}

export const disconnect = () => {
    return async dispatch => {
        window.localStorage.clear()
        dispatch(deleteUser())
    }
}