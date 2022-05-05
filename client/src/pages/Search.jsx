import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Card, Button, Container } from 'react-bootstrap'
import {
  getProducts,
  deleteProduct,
  reset,
} from '../features/product/productSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Search = () => {
  const { id } = useParams()
  const keyword = id

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { products, loading, success, error, message } = useSelector(
    state => state.products
  )

  const { user } = useSelector(state => state.auth)

  const searchResult = products.filter(product =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  )

  useEffect(() => {
    if (!success) {
      dispatch(getProducts())
    }
  }, [dispatch, success])

  return (
    <>
      <Container>
        {loading && <Loader />}
        {error && <Message variant='danger'>{message}</Message>}
        {searchResult.length === 0 ? (
          <>
            <Link to='/'>
              <Button className='p-3 m-2'>Go Back</Button>
            </Link>
            <Message variant='warning'>Product not found.</Message>
          </>
        ) : (
          <Row>
            {products &&
              products
                .filter(product =>
                  product.name.toLowerCase().includes(keyword.toLowerCase())
                )
                .map((product, index) => (
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
        )}
      </Container>
    </>
  )
}

export default Search
