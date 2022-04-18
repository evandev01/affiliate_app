const router = require('express').Router()
const { protect, admin } = require('../middleware/auth')
const { checkValidation, validate } = require('../middleware/validation')
const {
  login,
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controller/userController')

router.post('/login', login)

router
  .route('/')
  .post(checkValidation(), validate, registerUser)
  .get(protect, admin, getUsers)

router
  .route('/:id')
  .get(protect, getUserById)
  .put(protect, checkValidation(), validate, updateUser)
  .delete(protect, admin, deleteUser)

module.exports = router
