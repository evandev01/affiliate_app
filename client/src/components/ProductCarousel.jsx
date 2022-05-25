import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Carousel } from 'react-bootstrap'
import {
  getProducts,
  getRandomProducts,
} from '../features/product/productSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleChevronRight,
  faCircleChevronLeft,
} from '@fortawesome/free-solid-svg-icons'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const { randomProducts, successRandom } = useSelector(state => state.products)

  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!successRandom) {
      dispatch(getRandomProducts())
    }
  }, [dispatch, successRandom])

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <>
      <Row>
        <Col className='text-center'>
          <Carousel
            id='carousel'
            prevIcon={<FontAwesomeIcon icon={faCircleChevronLeft} />}
            nextIcon={<FontAwesomeIcon icon={faCircleChevronRight} />}
            activeIndex={index}
            onSelect={handleSelect}
            pause='hover'
            indicators={false}
            interval={3000}
            fade
          >
            {randomProducts &&
              randomProducts.map((product, index) => (
                <Carousel.Item key={index}>
                  <img
                    id='carousel-img'
                    className='mx-auto'
                    src={product.image}
                    alt='slide'
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </Col>
      </Row>
    </>
  )
}

export default ProductCarousel
