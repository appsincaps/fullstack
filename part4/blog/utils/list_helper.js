const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((s,v) => s+v.likes, 0)
}

module.exports = { dummy, totalLikes }