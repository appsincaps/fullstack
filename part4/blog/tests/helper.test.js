const listHelper = require('../utils/list_helper')

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

})