const Product = require('../models/ProductModel')
const asyncHandler = require('express-async-handler')

// @desc    Add a new product
// @route   POST '/product'
// @access  admin
const addProduct = asyncHandler(async (req, res) => {
  const { name, image, link, desc, article, video } = req.body
  try {
    const product = await Product.create({
      name: name,
      image: image,
      link: link,
      desc: desc,
      article: article,
      video: video,
    })

    if (product) {
      res.status(201).json({
        _id: product._id,
        name: product.name,
        link: product.link,
        desc: product.desc,
        article: product.article,
        video: product.video,
      })
    } else {
      res.status(400).json({ message: 'Product not found' })
      throw new Error('Product not found')
    }
  } catch (err) {
    res.json(err)
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
  } catch (err) {
    res.json(err)
  }
})

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
  } catch (err) {
    res.json(err)
  }
})

const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, link, desc, article, video } = req.body
  const _id = req.params.id

  try {
    const product = await Product.findById({ _id })

    if (product) {
      product.name = name || product.name
      product.image = image || product.image
      product.link = link || product.link
      product.desc = desc || product.desc
      product.article = article || product.article
      product.video = video || product.video

      const updatedProduct = await product.save()

      if (updatedProduct) {
        res.json(updatedProduct)
      }
    } else {
      res.status(404).json({ message: 'Product not found' })
      throw new Error('Product not found')
    }
  } catch (err) {
    res.json(err)
  }
})

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
  } catch (err) {
    res.json(err)
  }
})

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
}
