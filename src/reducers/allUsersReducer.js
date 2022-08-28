import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'
const allUsersReducer = createSlice({
    name : 'allUsers',
    initialState : [],
    reducers : {
        setUsers(state, action){
            return action.payload
        }
    }
})

export const { setUsers } = allUsersReducer.actions
export default allUsersReducer.reducer

export const initUsers = () => {
    return async dispatch => {
        const users = await usersService.getUsers()
        dispatch(setUsers(users))
    }
}