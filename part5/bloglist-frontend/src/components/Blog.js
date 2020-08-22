import React, { useState } from 'react'
const Blog = ({ blog, deleteBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [ expand, setExpand ] = useState(false)

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author} 
      <button onClick={() => deleteBlog(blog)}> delete </button>
      <button onClick={() => setExpand(!expand)}>{expand ? 'hide' : 'view'}</button>
      {expand &&
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button>Like</button></div>
          <div>{blog.user.name}</div>
        </div>
      }
    </div>
  )

}

export default Blog
