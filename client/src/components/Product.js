import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { deleteProduct, reset } from '../features/product/productSlice'

const Product = ({ product, index, user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <>
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
    </>
  )
}

export default Product
