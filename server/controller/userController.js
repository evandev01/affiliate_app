const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../utils/generateToken')
const bcrypt = require('bcryptjs')

// @desc    Login || Authenticate user & get token
// @route   POST /users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    res
      .status(401)
      .json('Email address not found. Please create an account to log in.')
    throw new Error(
      'Email address not found. Please create an account to log in.'
    )
  } else {
    try {
      const match = await bcrypt.compare(password, user.password)
      if (match) {
        res.json({
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        })
      } else {
        console.log('problems')
        res.status(401).json({ msg: 'Invalid email or password' })
        throw new Error('Invalid email or password')
      }
    } catch (error) {
      res.json(error)
      throw new Error(error)
    }
  }
})

// @desc    Register a new user
// @route   POST /user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, isAdmin } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400).json({ msg: 'User already exists' })
    throw new Error('User already exists')
  } else {
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 10),
        isAdmin,
      })

      if (user) {
        res.status(201).json({
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: generateToken(user._id),
        })
      } else {
        res.status(400).json({ msg: 'Invalid user data' })
        throw new Error('Invalid user data')
      }
    } catch (err) {
      res.json(err)
    }
  }
})

// @desc    Get all users
// @route   GET /user
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  if (!users) {
    res.status(404).json({ message: 'User not found' })
    throw new Error('User not found')
  } else {
    try {
      res.json(users)
    } catch (err) {
      res.json(err)
    }
  }
})

// @desc    Delete user
// @route   DELETE /user/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404).json({ message: 'User not found' })
    throw new Error('User not found')
  } else {
    try {
      await user.remove()
      res.json({ message: 'User removed' })
    } catch (err) {
      res.json(err)
    }
  }
})

// @desc    Get user by ID
// @route   GET /user/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (!user) {
    res.status(404).json({ message: 'User not found' })
    throw new Error('User not found')
  } else {
    try {
      res.json(user)
    } catch (err) {
      res.json(err)
    }
  }
})

// @desc    Update user info
// @route   PUT /user/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  const { firstName, lastName, email, password, isAdmin } = req.body

  if (!user) {
    res.status(404).json({ message: 'User not found' })
    throw new Error('User not found')
  } else {
    try {
      user.firstName = firstName || user.firstName
      user.lastName = lastName || user.lastName
      user.email = email || user.email
      user.password = bcrypt.hashSync(password, 10) || user.password
      user.isAdmin = isAdmin || user.isAdmin

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        password: updatedUser.password,
      })
    } catch (err) {
      res.json(err)
    }
  }
})

module.exports = {
  login,
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
