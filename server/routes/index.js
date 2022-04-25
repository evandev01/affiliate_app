const router = require('express').Router()
const users = require('./userRoutes')
const products = require('./productRoutes')

router.use('/api/users', users)
router.use('/api/products', products)

module.exports = router
