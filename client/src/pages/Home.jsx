import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap'
import Fireworks from '../assets/fireworks.jpg'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  deleteProduct,
  getProducts,
  reset,
} from '../features/product/productSlice'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    products,
    successDelete,
    loading,
    errorProducts,
    errorDelete,
    message,
  } = useSelector(state => state.products)

  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch, successDelete])

  return (
    <div>
      <Container style={{ background: 'none' }}>
        <Row className='text-center'>
          {errorProducts ||
            (errorDelete && <Message variant='danger'>{message}</Message>)}
          {loading && <Loader />}
          {products &&
            products.map((product, index) => (
              <Col key={index} className='text-center p-2 m-2'>
                <Card style={{ width: '18rem', height: 'fit-content' }}>
                  <Card.Img variant='top' src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.desc}</Card.Text>
                  </Card.Body>
                  <Col className='text-center'>
                    <Link to={product.link}>
                      <Card.Text>{product.desc}</Card.Text>
                    </Link>
                  </Col>
                  {user && user.isAdmin && (
                    <Card.Footer>
                      <Row>
                        <Col>
                          <Button
                            onClick={e => {
                              e.preventDefault()
                              dispatch(reset())
                              navigate(`/edit/${product._id}`)
                            }}
                            className='btn btn-primary p-2 mt-2'
                            style={{
                              display: 'block',
                              width: '100%',
                              padding: '10px',
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            variant='warning'
                            className='p-2 mt-2'
                            style={{
                              display: 'block',
                              width: '100%',
                              padding: '10px',
                            }}
                            onClick={e => {
                              e.preventDefault()
                              dispatch(deleteProduct(product._id))
                            }}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Card.Footer>
                  )}
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  )
}

export default Home
