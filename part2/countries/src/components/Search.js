import React from 'react'

const Search = ({search, onChange}) => {
  return (
    <div>
      <form>
        Find countries: <input onChange={onChange} value={search} />
      </form>
    </div>
  )
}

export default Search