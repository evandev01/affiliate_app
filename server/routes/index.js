const router = require('express').Router()
const user = require('./userRoutes')
const product = require('./productRoutes')

router.use('/user', user)
router.use('/product', product)

module.exports = router
