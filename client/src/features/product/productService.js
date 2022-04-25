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
const getProducts = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// GET PRODUCT BY ID
const getProductById = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + productId, config)

  return response.data
}

// UPDATE PRODUCT
const updateProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    API_URL + productData._id,
    productData,
    config
  )

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
  getProductById,
  updateProduct,
  deleteProduct,
}

export default productService
