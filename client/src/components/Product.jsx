import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { deleteProduct, reset } from '../features/product/productSlice'

const Product = ({ product, index, user, loading, error, message }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { successDelete } = useSelector(state => state.products)

  useEffect(() => {
    if (successDelete) {
      navigate('/')
    }
  }, [successDelete, navigate])

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger'>{message}</Message>}

      <Col key={index} xs={6} md={4} lg={3} xl={2} className='text-center mt-2'>
        <Card id='product-card' key={index} className='text-center '>
          <Col className='text-center'>
            <Card.Img
              id='product-card-img'
              className='text-center'
              variant='top'
              src={product.image}
            />

            <Card.Body className='text-center'>
              <Card.Text style={{ color: 'black' }}>{product.name}</Card.Text>
              <Card.Title id='product-title' style={{ color: 'black' }}>
                <strong>{product.price ? `$${product.price}` : '$0.00'}</strong>
              </Card.Title>
              <Link
                id='details-link'
                className='card-link p-2 btn btn-primary'
                to={`/product/${product._id}`}
              >
                Details
              </Link>
              <br />
              <a
                id='amazon-link'
                className='card-link p-2 mt-2 btn btn-primary'
                href={product.link}
                target='_blank'
                rel='noreferrer noopener'
              >
                Amazon
              </a>
            </Card.Body>
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
          </Col>
        </Card>
      </Col>
    </>
  )
}

export default Product
