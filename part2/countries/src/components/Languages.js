import React from 'react'

const Languages = ({languages}) => {
  return (
    <div>
      <h3>Languages:</h3>
      {languages.map(language=><div key={language.name}>{language.name}</div>)}
    </div>
  )
}

export default Languages