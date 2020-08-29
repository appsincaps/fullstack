import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoggedInfo from './components/LoggedInfo'
import BlogList from './components/BlogList'
import CreateNew from './components/CreateNew'
import Toggable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('username')
  const [password, setPassword] = useState('password')
  const [user, setUser] = useState(null)
  const toggleRef = useRef()

  const handleLogin = async (event) => {

    event.preventDefault()

    try {
      const logged = await loginService.login( { username, password } )
      setUser(logged)
      blogService.setToken(logged.token)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('user', JSON.stringify(logged))
    }
    catch (error) {
      setMessage( { error:'Wrong credentials' } )
      setTimeout( () => {
        setMessage(null)
      }, 5000)
    }

  }

  const createBlog = async blog => {
    const newBlog = await blogService.create(blog)
    setBlogs( blogs.concat(newBlog) )
    toggleRef.current.toggle()
  }

  const deleteBlog = async blog => {
    if (!window.confirm(`Delete ${blog.title}?`)) return
    await blogService.remove(blog.id)
    const i = blogs.findIndex( v => blog.id === v.id )
    setBlogs([...blogs.slice(0,i), ...blogs.slice(i+1)])
  }

  const upLike = async blog => {
    blog.likes++
    const newBlog = await blogService.update(blog)
    const i = blogs.findIndex( v => blog.id === v.id )
    setBlogs([...blogs.slice(0,i), newBlog, ...blogs.slice(i+1)])
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('user')
    setUser(null)
  }

  useEffect( () => {
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

  return (
    <div>
      <LoggedInfo user={user} />
      <Notification message={message} />
      { !user
        ? <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
        : <div>
          <BlogList
            handleLogout={handleLogout}
            deleteBlog={deleteBlog}
            upLike={upLike}
            blogs={blogs}
            user={user}
          />
          <Toggable label='Create a new blog' ref={toggleRef}>
            <CreateNew createBlog={createBlog} setMessage={setMessage} />
          </Toggable>
        </div>
      }
    </div>
  )
}

export default App