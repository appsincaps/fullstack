import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (user) setUser(JSON.parse(user))
    console.log(user)
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
        {`${user.name} is logged in`}
        <button onClick={handleLogout}>Logout</button>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
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