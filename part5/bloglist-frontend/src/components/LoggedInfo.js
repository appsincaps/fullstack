import React from 'react'

const LoggedInfo = ( { user } ) => {

  if (user === null) return null

  return (
    <div className='loggedinfo'>
      {`${user.name} is logged in`}
    </div>
  )
}

export default LoggedInfo