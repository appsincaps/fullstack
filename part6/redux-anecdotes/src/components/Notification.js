import React from 'react'
import { useSelector } from 'react-redux'
import { error, success, remove } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
      <div style={style}>
        {notification}
      </div>
  )
}

export default Notification