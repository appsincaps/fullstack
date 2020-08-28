import React, { useState } from 'react'

const CreateNew = ( { createBlog, setMessage } ) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async event => {
    event.preventDefault()
    try {
      const blog = {
        title,
        author,
        url
      }
      await createBlog(blog)

      setMessage( { success: `${title} by ${author} is added` } )
      setTimeout( () => {
        setMessage(null)
      }, 3000)

      setTitle('')
      setAuthor('')
      setUrl('')
    }
    catch (error) {
      setMessage( { error: error.message } )
      setTimeout( () => {
        setMessage(null)
      }, 3000)
    }
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreate} id='form' >
        <div>
          Title:
          <input
            id = 'title'
            type = 'text'
            value = {title}
            name = 'Title'
            onChange = { ({ target }) => setTitle(target.value) }
          />
        </div>
        <div>
          Author:
          <input
            id = 'author'
            type = 'text'
            value = {author}
            name = 'Author'
            onChange = { ({ target }) => setAuthor(target.value) }
          />
        </div>
        <div>
          URL:
          <input
            id = 'url'
            type = 'text'
            value = {url}
            name = 'URL'
            onChange = { ({ target }) => setUrl(target.value) }
          />
        </div>
        <button type='submit' id='submit'>Create</button>
      </form>
    </div>
  )
}

export default CreateNew