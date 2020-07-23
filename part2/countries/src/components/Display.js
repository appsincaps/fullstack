import React from 'react'

const Display = ({country, show}) => {
  return (
    <div>
      {country.name}
      <button onClick={()=>show(country.name)}>show</button>
    </div>
  )
}

export default Display