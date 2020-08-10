const listHelper = require('../utils/list_helper')

const sampleBlogs = [ 
  { 
    _id: "5a422a851b54a676234d17f7", 
    title: "React patterns", 
    author: "Michael Chan", 
    url: "https://reactpatterns.com/", 
    likes: 7, 
    __v: 0 
  }, 
  { 
    _id: "5a422aa71b54a676234d17f8", 
    title: "Go To Statement Considered Harmful", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
    likes: 5, 
    __v: 0 
  }, 
  { 
    _id: "5a422b3a1b54a676234d17f9", 
    title: "Canonical string reduction", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
    likes: 12, 
    __v: 0 
  }, 
  { 
    _id: "5a422b891b54a676234d17fa", 
    title: "First class tests", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
    likes: 10, 
    __v: 0 
  }, 
  { 
    _id: "5a422ba71b54a676234d17fb", 
    title: "TDD harms architecture", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
    likes: 0, 
    __v: 0 
  }, 
  { 
    _id: "5a422bc61b54a676234d17fc", 
    title: "Type wars", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
    likes: 2, 
    __v: 0 
  }
]

test('dummy always returns one', () => {
  expect(listHelper.dummy([])).toBe(1)
})

describe('Total Likes', () => {

  test('1. Empty blog list', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  const testList = [
    {likes: 1},
    {likes: 2},
    {likes: 3}
  ]

  test('2. Test list', () => {
    expect(listHelper.totalLikes(testList)).toBe(6)
  })

  test('3. Sample Blogs', () => {
    expect(listHelper.totalLikes(sampleBlogs)).toBe(36)
  })

})

describe('Favorite Blog', () => {

  test('1. Empty blogs list', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })

  test('2. Sample blogs list', () => {
    expect(listHelper.favoriteBlog(sampleBlogs)).toEqual(sampleBlogs[2])
  })
})

describe('Most Blogs', () => {

  test('1. Empty blogs list', () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })

  test('2. Sample blogs list', () => {
    expect(listHelper.mostBlogs(sampleBlogs)).toEqual({author:"Robert C. Martin", blogs:3})
  })
})

describe('Most Likes', () => {

  test('1. Empty blogs list', () => {
    expect(listHelper.mostLikes([])).toBe(null)
  })

  test('2. Sample blogs list', () => {
    expect(listHelper.mostLikes(sampleBlogs)).toEqual({author:"Edsger W. Dijkstra", likes:17})
  })
})