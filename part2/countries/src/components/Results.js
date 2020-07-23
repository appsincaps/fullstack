import React from 'react'
import Display from './Display'
import Detail from './Detail'

const Results = ({list}) => {

  if (list.length === 0) {
    return <div>No results</div>
  } 
  
  else if (list.length === 1) {
    return <Detail country={list[0]} />
  } 
  
  else if (list.length > 10) {
    return <div>Too many matches, specify another filter...</div>
  } 
  
  else {
    return (
      <div>
        {list.map(country=><Display key={country.name} country={country} />)}
      </div>
    )
  }
}

export default Results