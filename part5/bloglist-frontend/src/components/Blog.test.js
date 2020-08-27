import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> defaults', () => {

  const title = 'Very fancy test title'
  const author = 'Test Author'
  const url = 'http://www.test.com'
  const likes = 9876
  const blog = { title, author, url, likes }
  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders title', () => {
    expect(component.container).toHaveTextContent(title)
  })

  test('renders author', () => {
    expect(component.container).toHaveTextContent(author)
  })

  test('not renders url', () => {
    expect(component.container).not.toHaveTextContent(url)
  })

  test('not renders likes', () => {
    expect(component.container).not.toHaveTextContent(likes)
  })

})

