import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  getProductById,
  deleteProduct,
  reset,
} from '../features/product/productSlice'

const ProductDetails = () => {
  const { id } = useParams()
  const productId = id

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { product, successProduct, loading, error, message } = useSelector(
    state => state.products
  )
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (!successProduct && productId) {
      dispatch(getProductById(productId))
    }
  }, [dispatch, successProduct, productId])

  return (
    <>
      <Container>
        {loading && <Loader />}
        {error && <Message variant='danger'>{message}</Message>}
        {product && (
          <Row>
            <Col>
              <Image src={product.image} />
            </Col>
            <Col>
              <h1>${product.price}</h1>
              <br />
              <h4>{product.desc}</h4>
              <br />
              {product.review && (
                <>
                  <h4>Evan's Review</h4>
                  <p>{product.review}</p>
                  <br />
                </>
              )}
              {product.article && (
                <>
                  <h4>Amazon Details</h4>
                  <p>{product.article}</p>
                  <br />
                </>
              )}
              <Button
                href={product.link}
                rel='noreferrer'
                target='_blank'
                className='text-center btn btn-primary p-2 mt-2'
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px',
                }}
              >
                View on Amazon
              </Button>

              {user && user.isAdmin && (
                <>
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
                </>
              )}
            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}

export default ProductDetails
