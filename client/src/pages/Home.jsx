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
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant='top' src='holder.js/100px180' />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.desc}</Card.Text>
                    {user && user.isAdmin && (
                      <div className='d-grid gap-2'>
                        <Link to={`/edit/${product._id}`}>
                          <Button variant='primary'>Edit</Button>
                        </Link>

                        <Button
                          variant='warning'
                          onClick={e => {
                            e.preventDefault()
                            dispatch(deleteProduct(product._id))
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  )
}

export default Home
