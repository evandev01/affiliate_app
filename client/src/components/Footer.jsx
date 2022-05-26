import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import Logo from '../assets/icons/evanDev_logo.png'

const Footer = () => {
  return (
    <footer className='m-5 p-5'>
      <Row className='justify-content-md-center'>
        <Col className='text-center'>
          <Image id='logo-footer' src={Logo} className='m-2' />
        </Col>
      </Row>
      <Row>
        <Col className='text-center'>
          Copyright <strong> &copy; evanDev</strong>
        </Col>
      </Row>
    </footer>
  )
}

export default Footer
