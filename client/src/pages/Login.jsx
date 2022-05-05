import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  // signOut,
} from 'firebase/auth'
import { auth } from '../firebase/config'
import { login, reset } from '../features/auth/authSlice'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { email, password } = formData

  const [firebaseEmail, setFirebaseEmail] = useState('')
  const [firebasePassword, setFirebasePassword] = useState('')
  const [firebaseUser, setFirebaseUser] = useState({})

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, loading, errorLogin, successLogin, message } = useSelector(
    state => state.auth
  )

  onAuthStateChanged(auth, currentUser => {
    setFirebaseUser(currentUser)
  })

  useEffect(() => {
    const loginFirebase = async () => {
      try {
        const userFirebase = await signInWithEmailAndPassword(
          auth,
          firebaseEmail,
          firebasePassword
        )
        console.log(userFirebase)
      } catch (error) {
        console.log(error.message)
      }
    }
    if (successLogin && user && user.isAdmin) {
      loginFirebase()
      dispatch(reset())
      // navigate('/')
    }
  }, [dispatch, navigate, user, successLogin, firebaseEmail, firebasePassword])

  const changeHandler = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = e => {
    e.preventDefault()
    // loginFirebase()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  return (
    <>
      <Container>
        <Row>
          {loading && <Loader />}
          {errorLogin && <Message variant='danger'>{message}</Message>}
          <Col>
            <Form onSubmit={e => submitHandler(e)}>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Enter email'
                  onChange={e => {
                    setFirebaseEmail(e.target.value)
                    changeHandler(e)
                  }}
                  value={email}
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Password'
                  onChange={e => {
                    setFirebasePassword(e.target.value)
                    changeHandler(e)
                  }}
                  value={password}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                <Form.Check type='checkbox' label='Check me out' />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login

// const register = async () => {
//   try {
//     const user = await createUserWithEmailAndPassword(
//       auth,
//       registerEmail,
//       registerPassword
//     )
//     console.log(user)
//   } catch (error) {
//     console.log(error.message)
//   }
// }

// const loginFirebase = async () => {
//   try {
//     const userFirebase = await signInWithEmailAndPassword(
//       auth,
//       firebaseEmail,
//       firebasePassword
//     )
//     console.log(userFirebase)
//   } catch (error) {
//     console.log(error.message)
//   }
// }

// const logout = async () => {
//   await signOut(auth)
// }
