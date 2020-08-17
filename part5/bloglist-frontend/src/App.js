import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('username')
  const [password, setPassword] = useState('password')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {

    event.preventDefault()
    
    try {
      const logged = await loginService.login( { username, password } )
      console.log(logged)
      setUser(logged)
      blogService.setToken(logged.token)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('user', JSON.stringify(logged))
    }
    catch (error) {
      setMessage('Wrong credentials')
      setTimeout( () => {
        setMessage('')
      }, 3000)
    }

  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleCreate = (event) => {
    event.preventDefault()
    const blog = {
      title,
      author,
      url
    }
    blogService.create(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  useEffect(() => {
    blogService.get().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    let savedUser = window.localStorage.getItem('user')
    if (savedUser) {
      savedUser = JSON.parse(savedUser)
      setUser(savedUser)
      blogService.setToken(savedUser.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input 
            type = 'text'
            value = {username}
            name = 'Username'
            onChange = { ({target}) => setUsername(target.value) }
          />
        </div>
        <div>
          Password:
          <input 
            type = 'password'
            value = {password}
            name = 'Password'
            onChange = { ({target}) => setPassword(target.value) }
          />
        </div>
        <div>
          <button type = 'submit'>Login</button>
        </div>
      </form>
    )
  }

  const blogList = () => {
    return (
      <div>
        {`${user.name} is logged in:`}
        <button onClick={handleLogout}>Logout</button>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        {createNew()}
      </div>
    )
  }

  const createNew = () => {
    return (
      <div>
        <h2>Create new blog</h2>
        <form onSubmit={handleCreate}>
          <div>
            Title: 
            <input 
              type = 'text'
              value = {title}
              name = 'Title'
              onChange = { ({target}) => setTitle(target.value) }
            />
          </div>
          <div>
            Author: 
            <input 
              type = 'text'
              value = {author}
              name = 'Author'
              onChange = { ({target}) => setAuthor(target.value) }
            />
          </div>
          <div>
            URL: 
            <input 
              type = 'text'
              value = {url}
              name = 'URL'
              onChange = { ({target}) => setUrl(target.value) }
            />
          </div>
          <button type='submit'>Save</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={message}></Notification>
      { !user 
      ? loginForm()
      : blogList()
      }
    </div>
  )
}

export default App