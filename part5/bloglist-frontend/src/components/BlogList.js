import React from 'react'
import Blog from './Blog'

const BlogList = (props) => {
  const {
    handleLogout,
    deleteBlog,
    upLike,
    blogs,
    user
  } = props

  const sortedBlogs = [...blogs]
  sortedBlogs.sort( (blog1, blog2) => blog2.likes - blog1.likes )

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h2>blogs</h2>
      {[...blogs]
        .sort( (blog1, blog2) => blog2.likes - blog1.likes )
        .map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog} 
            deleteBlog={deleteBlog} 
            upLike={upLike}
            user={user}
          />)
      }
    </div>
  )
}

export default BlogList