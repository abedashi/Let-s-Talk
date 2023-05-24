import axios from 'axios'

const API_URL = 'http://localhost:3001/api/groups/'

const getGroups = async (token: string) => {
  const { data } = await axios.get(API_URL + 'get-groups', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}

const getGroup = async (id: string, token: string) => {
  const { data } = await axios.get(API_URL + `get-group/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}

const groupsService = {
  getGroups,
  getGroup,
}

export default groupsService
