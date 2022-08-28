import { configureStore } from '@reduxjs/toolkit'
import allUsersReducer from './reducers/allUsersReducer'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer : {
        blogs : blogsReducer,
        notification : notificationReducer,
        user : userReducer,
        allUsers: allUsersReducer
    }
})

export default store