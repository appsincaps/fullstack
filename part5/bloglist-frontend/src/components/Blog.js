import React, { useState } from 'react'
const Blog = ({ blog, deleteBlog, upLike, user }) => {

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
      <button onClick={() => setExpand(!expand)}>{expand ? 'hide' : 'view'}</button>
      { expand &&
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={() => upLike(blog)}>Like</button></div>
          <div>{blog.user.name}</div>
          { (user.username === blog.user.username) && 
            <div> <button onClick={() => deleteBlog(blog)}> delete </button> </div>
          }
          
        </div>
      }
    </div>
  )

}

export default Blog
