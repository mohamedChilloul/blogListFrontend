

const NewBlog = ({
    handleCreate,
    handleAuthor,
    handleTitle,
    handleUrl,
    url,
    title,
    author
}) =>{
    return(
        <div>
        <h2>create new</h2>
        <form onSubmit={handleCreate}>
          <label>title  </label>
          <input value={title} onChange={handleTitle}></input>
          <br></br>
          <label>author </label>
          <input value={author} onChange={handleAuthor}></input>
          <br></br>
          <label>url    </label>
          <input value={url} onChange={handleUrl}></input>
          <br></br>
          <button>create</button>
        </form>
      </div>
    )
}

export default NewBlog