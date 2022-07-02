import { useState } from 'react'

const NewBlog = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleAuthor = (e) => {
        setAuthor(e.target.value)
    }
    const handleUrl = (e) => {
        setUrl(e.target.value)
    }
    const handleCreate = (e) => {
        e.preventDefault()
        createBlog({
            title,
            author,
            url
        })
    }
    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreate}>
                <label>title  </label>
                <input id='titleInp' value={title} onChange={handleTitle}></input>
                <br></br>
                <label>author </label>
                <input id='authorInp' value={author} onChange={handleAuthor}></input>
                <br></br>
                <label>url    </label>
                <input id='urlInp' value={url} onChange={handleUrl}></input>
                <br></br>
                <button id='createButton'>create</button>
            </form>
        </div>
    )
}

export default NewBlog