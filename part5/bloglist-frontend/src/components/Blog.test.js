import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import { act } from 'react-dom/test-utils'
import Blog from './Blog'
import CreateNew from './CreateNew'

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
    //const blog = component.container.querySelector('.blog')
    //console.log(prettyDOM(blog))
  })

})

describe('<Blog /> view clicked', () => {

  const username = 'username'
  const name = 'User Name'
  const password = 'password'
  const user = { username, name, password }
  const title = 'Very fancy test title'
  const author = 'Test Author'
  const url = 'http://www.test.com'
  const likes = 9876
  const blog = { title, author, url, likes, user }
  const mockHandler = jest.fn()

  let component
  let viewButton
  let likeButton

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} upLike={mockHandler} />
    )

    viewButton = component.container.querySelector('.viewButton')
    fireEvent.click(viewButton)
    likeButton = component.container.querySelector('.likeButton')

  })

  test('renders title', () => {
    expect(component.container).toHaveTextContent(title)
  })

  test('renders author', () => {
    expect(component.container).toHaveTextContent(author)
  })

  test('renders url', () => {
    expect(component.container).toHaveTextContent(url)
  })

  test('renders likes', () => {
    expect(component.container).toHaveTextContent(likes)
    const blog = component.container.querySelector('.blog')
    //console.log(prettyDOM(blog))
  })

  test('like button works', () => {
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})

describe('<CreateNew /> form behavior', () => {

  const mockHandler = jest.fn()
  const title = 'Test Title'
  const author = 'Test Author'
  const url = 'http://test.url'

  let component
  let form
  let titleInput
  let authorInput
  let urlInput

  beforeEach(() => {

    component = render(
      <CreateNew createBlog={mockHandler} setMessage={() => {}} />
    )

    titleInput = component.container.querySelector('#title')
    authorInput = component.container.querySelector('#author')
    urlInput = component.container.querySelector('#url')
    form = component.container.querySelector('#form')

    act(() => {
      fireEvent.change(titleInput, {
        target: { value: title }
      })

      fireEvent.change(authorInput, {
        target: { value: author }
      })

      fireEvent.change(urlInput, {
        target: { value: url }
      })
    })

  })

  test('submit button works', () => {
    fireEvent.submit(form)
    expect(mockHandler.mock.calls[0][0].title).toBe(title)
    expect(mockHandler.mock.calls[0][0].author).toBe(author)
    expect(mockHandler.mock.calls[0][0].url).toBe(url)
  })

})