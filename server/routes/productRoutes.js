const router = require('express').Router()
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getRandomProducts,
} = require('../controller/productController')
const { protect, admin } = require('../middleware/auth')

router.route('/').post(protect, admin, addProduct).get(getProducts)
router.route('/random').get(getRandomProducts)

router
  .route('/:id')
  .get(getProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)

module.exports = router
