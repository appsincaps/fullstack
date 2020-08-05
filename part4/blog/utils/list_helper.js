const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((s,v) => s+v.likes, 0)
}

const favoriteBlog = blogs => {
  return blogs.reduce((s,v) => (!s || v.likes>s.likes) ? v : s, null)
}

module.exports = { dummy, totalLikes, favoriteBlog }