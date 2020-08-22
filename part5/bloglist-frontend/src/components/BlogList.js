import React from 'react'
import Blog from './Blog'

const BlogList = (props) => {
  const {
    handleLogout,
    deleteBlog,
    upLike,
    blogs
  } = props

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} upLike={upLike}/>
      )}
    </div>
  )
}

export default BlogList