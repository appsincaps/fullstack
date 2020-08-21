import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const get = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blog => {
  const headers = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, blog, headers)
  return response.data
}

const remove = async id => {
  const headers = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, headers)
  return response.data
}

export default { get, create, remove, setToken }