import axios from 'axios'

const basedUrl = '/api/login'

const login = async (credentials) => {
    const request = await axios.post(basedUrl, credentials)
    return request.data
}

export default {
    login
}