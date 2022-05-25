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
    // TODO: Add getProductById to get type and navigate to page below
    // if (successDelete && successProduct) {
    //   navigate(`/products/${product.type}`)
    // }
  }, [successDelete, navigate])

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger'>{message}</Message>}

      <Col key={index} xs='auto' className='text-center'>
        <Card id='product-card' key={index} className='text-center p-3 m-2'>
          <Col className='text-center'>
            <Card.Img
              id='product-card-img'
              className='text-center'
              variant='top'
              src={product.image}
            />
          </Col>
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Title>
              <strong> {product.price ? `$${product.price}` : '$0.00'}</strong>
            </Card.Title>
            <Link to={`/product/${product._id}`}>
              <Button className='text-center m-2'>View Details</Button>
            </Link>
            <Button
              href={product.link}
              rel='noreferrer'
              target='_blank'
              className='text-center m-2'
            >
              View on Amazon
            </Button>
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
                      // TODO: dispatch(getProductById(product._id))
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
    </>
  )
}

export default Product
