import axios from 'axios'

const API_URL = '/user'

const getUsers = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const getUserById = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, userId, config)

  return response.data
}

const updateUser = async (userInfo, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL, userInfo, config)

  return response.data
}

const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL, userId, config)

  return response.data
}

const userService = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
}

export default userService
