import React from 'react'

const Flag = ({flag}) => {
  return (
    <div>
      <h3>Flag:</h3>
      <img src={flag} alt='Country flag' width='50' height='50'/>
    </div>
  )
}

export default Flag