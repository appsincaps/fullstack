const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((s,v) => s+v.likes, 0)
}

const favoriteBlog = blogs => {
  return blogs.reduce((s,v) => (!s || v.likes>s.likes) ? v : s, null)
}

const mostBlogs = blogs => {
  const counts = blogs.reduce((s,v) => {
    s[v['author']] = (s[v['author']] || 0) + 1
    return s
  }, {})
  return _.reduce(counts, (s,v,i) => (!s || v>s.blogs) ? {author:i, blogs:v} : s, null)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }