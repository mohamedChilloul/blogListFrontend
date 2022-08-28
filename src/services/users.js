import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'


//getting all users and their blogs from the backend :


const getUsers = async () => {
    const result = await axios.get(baseUrl)
    return result.data
}

export default {
    getUsers
}
