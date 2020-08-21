import React from 'react'
const Blog = ({ blog, deleteBlog }) => (
  <div>
    {blog.title} by {blog.author} 
    <button onClick={() => deleteBlog(blog)}> delete </button>
  </div>
)

export default Blog
