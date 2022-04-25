import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { login, reset } from '../features/auth/authSlice'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  )

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isSuccess, dispatch, navigate])

  const changeHandler = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = e => {
    e.preventDefault()

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
          <Col>
            <Form onSubmit={e => submitHandler(e)}>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Enter email'
                  onChange={changeHandler}
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
                  onChange={changeHandler}
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
