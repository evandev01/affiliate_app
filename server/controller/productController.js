const Product = require('../models/ProductModel')
const asyncHandler = require('express-async-handler')

// @desc    Add a new product
// @route   POST '/product'
// @access  admin
const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    link,
    desc,
    article,
    review,
    video,
    type,
    featured,
  } = req.body
  try {
    const product = await Product.create({
      name: name,
      price: price,
      image: image,
      link: link,
      desc: desc,
      article: article,
      review: review,
      video: video,
      type: type,
      featured: featured,
    })

    if (product) {
      res.status(201).json({
        _id: product._id,
        name: product.name,
        price: product.price,
        link: product.link,
        desc: product.desc,
        article: product.article,
        review: review,
        video: product.video,
        type: product.type,
      })
    } else {
      res.status(400).json({ message: 'Product not found' })
      throw new Error('Product not found')
    }
  } catch (error) {
    res.json(error)
  }
})

// @desc    Get all products
// @route   GET '/product'
// @access  public
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})

    if (products) {
      res.json(products)
    } else {
      res.status(404).json({ message: 'Product not found' })
      throw new Error('Product not found')
    }
  } catch (error) {
    res.json(error)
  }
})

// @desc    Get all products
// @route   GET '/product'
// @access  public
const getRandomProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})

    if (products) {
      for (let i = products.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i)
        let k = products[i]
        products[i] = products[j]
        products[j] = k
      }
      res.json(products)
    } else {
      res.status(404).json({ message: 'Product not found' })
      throw new Error('Product not found')
    }
  } catch (error) {
    res.json(error)
  }
})
// @desc    Get product
// @route   GET '/product/:id'
// @access  public
const getProduct = asyncHandler(async (req, res) => {
  const _id = req.params.id

  try {
    const product = await Product.findById({ _id })

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
      throw new Error('Product not found')
    }
  } catch (error) {
    res.json(error)
  }
})

// @desc    Update product
// @route   PUT '/product/:id'
// @access  admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    link,
    desc,
    article,
    review,
    video,
    type,
    featured,
  } = req.body
  const _id = req.params.id

  try {
    const product = await Product.findById({ _id })

    if (product) {
      product.name = name
      product.price = price
      product.image = image
      product.link = link
      product.desc = desc
      product.article = article
      product.review = review
      product.video = video
      product.type = type
      product.featured = featured

      const updatedProduct = await product.save()

      if (updatedProduct) {
        res.json(updatedProduct)
      }
    } else {
      res.status(404).json({ message: 'Product not found' })
      throw new Error('Product not found')
    }
  } catch (error) {
    res.json(error)
  }
})

// @desc    Delete product
// @route   DELETE '/product/:id'
// @access  admin
const deleteProduct = asyncHandler(async (req, res) => {
  const _id = req.params.id

  try {
    const product = await Product.findById({ _id })

    if (product) {
      await product.remove()
      res.json({ message: 'Product removed' })
    } else {
      res.status(404).json({ message: 'Product not found' })
      throw new Error('Product not found')
    }
  } catch (error) {
    res.json(error)
  }
})

module.exports = {
  addProduct,
  getProducts,
  getRandomProducts,
  getProduct,
  updateProduct,
  deleteProduct,
}
