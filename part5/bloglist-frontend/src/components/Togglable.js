import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef(( props, ref ) => {
  const [ visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggle = () => {
    setVisible(!visible)
  }

  useImperativeHandle( ref, () => {
    return { toggle }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggle}> {props.label} </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggle}> cancel </button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  label: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable