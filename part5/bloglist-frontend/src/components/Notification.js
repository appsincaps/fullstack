import React from 'react'

const Notification = ( {message} ) => {

  if ( message === null ) {
    return null
  }

  let type
  if (message.error) {
    type = 'error'
  }
  else {
    type = 'success'
  }
  return (
    <div className={type}>
      {message[type]}
    </div>
  )
}

export default Notification