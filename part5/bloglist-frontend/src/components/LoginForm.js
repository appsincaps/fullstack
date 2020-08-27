import React from 'react'

const LoginForm = (props) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin
  } = props

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          type = 'text'
          value = {username}
          name = 'Username'
          onChange = { ({ target }) => setUsername(target.value) }
        />
      </div>
      <div>
        Password:
        <input
          type = 'password'
          value = {password}
          name = 'Password'
          onChange = { ({ target }) => setPassword(target.value) }
        />
      </div>
      <div>
        <button type = 'submit'>Login</button>
      </div>
    </form>
  )
}

export default LoginForm