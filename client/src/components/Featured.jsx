import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import Product from './Product'
import Message from '../components/Message'
import Loader from '../components/Loader'

const Featured = ({ type, title, products, user, loading, error, message }) => {
  // const [loadingTitle, setLoadingTitle] = useState(false)

  // useEffect(() => {
  //   if (!title) {
  //     setLoadingTitle(true)
  //   } else {
  //     setLoadingTitle(false)
  //   }
  // }, [title])

  return (
    <>
      {error && <Message variant='danger'>{message}</Message>}
      {loading && <Loader />}
      <Row className='mt-5 mb-2' id={`border`}>
        <Col>
          <h5 id='featured'>{title}</h5>
        </Col>
      </Row>
      <Row className='mt-3 mb-2'>
        <Col
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Link to={`/products/${type}`}>
            <Button id='featured' size='md'>
              View All
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {products &&
          products.map((product, index) => (
            <Product key={index} product={product} index={index} user={user} />
          ))}
      </Row>
    </>
  )
}

export default Featured
