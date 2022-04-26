import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteProduct, getProducts } from '../features/product/productSlice'

const Home = () => {
  const dispatch = useDispatch()

  const { products, successDelete, loading, isError, message } = useSelector(
    state => state.products
  )

  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch, successDelete])

  return (
    <>
      <Container>
        <Row>
          {isError && <Message>{`${message}`}</Message>}
          {loading && <Loader />}
          {products &&
            products.map((product, index) => (
              <Col key={index} className='text-center p-1'>
                <Card style={{ width: '18rem', height: 'fit-content' }}>
                  <Card.Img variant='top' src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.desc}</Card.Text>
                  </Card.Body>
                  <Col className='text-center' md={6}>
                    <Link to={product.link}>
                      <Card.Text>{product.desc}</Card.Text>
                    </Link>
                  </Col>
                  {user && user.isAdmin && (
                    // <div className='d-grid gap-2'>
                    <Card.Footer>
                      <Row>
                        <Col>
                          <a
                            href={`/edit/${product._id}`}
                            className='btn btn-primary p-2 mt-2'
                            style={{
                              display: 'block',
                              width: '100%',
                              padding: '10px',
                            }}
                          >
                            Edit
                          </a>

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
                    // </div>
                  )}
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  )
}

export default Home
