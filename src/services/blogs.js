import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const createNewBlog = async (newBlog) => {

    const config = {
        headers : {
            authorization : token
        }
    }

    const request = await axios.post(baseUrl, newBlog, config)
    return request.data
}
const updateLikes =  async (id, newBlog) => {
    const request = await axios.put(`${baseUrl}/${id}`, newBlog)
    return request.data
}

const deleteBlog = async (id) => {
    const config = {
        headers : {
            authorization : token
        }
    }
    const request = await axios.delete(`${baseUrl}/${id}`,config)
    return request.data
}

const addComment = async (id, comment) => {
    const res = await axios.post(`${baseUrl}/${id}/comments`, comment)
    return res.data
}

export default { getAll, createNewBlog, setToken, updateLikes, deleteBlog, addComment }