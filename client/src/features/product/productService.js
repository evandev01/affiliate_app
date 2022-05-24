import axios from 'axios'

const API_URL = '/api/products/'

// ADD PRODUCT
const addProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, productData, config)

  return response.data
}

// GET ALL PRODUCTS
const getProducts = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

// GET ALL PRODUCTS
const getRandomProducts = async () => {
  const response = await axios.get(API_URL + 'random')

  return response.data
}

// GET PRODUCT BY ID
const getProductById = async productId => {
  const response = await axios.get(API_URL + productId)

  return response.data
}

// UPDATE PRODUCT
const updateProduct = async (product, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + product._id, product, config)

  return response.data
}

// DELETE PRODUCT
const deleteProduct = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + productId, config)

  return response.data
}

const productService = {
  addProduct,
  getProducts,
  getRandomProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}

export default productService
