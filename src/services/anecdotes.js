import axios from 'axios'

const baseUrl = '/api/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data.sort((a, b) => b.votes - a.votes)
}

const createNew = async (content) => {
  const response = await axios.post(baseUrl, { content })
  return response.data
}

const vote = async (id) => {
  const response = await axios.post(`${baseUrl}/vote`, { id })
  return response.data
}

export default {
  getAll,
  createNew,
  vote,
}