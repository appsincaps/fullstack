import axios from 'axios'

const url = 'http://localhost:3001/api/persons'

const getAll = () => axios.get(url).then(response => response.data)
const create = person => axios.post(url, person).then(response => response.data)
const update = (id, person) => axios.put(`${url}/${id}`, person).then(response => response.data)
const remove = (id) => axios.delete(`${url}/${id}`).then(response => response.data)

export default {getAll, create, update, remove} 