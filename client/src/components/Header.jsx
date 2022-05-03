import React from 'react'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'

const Header = () => {
  return (
    <header className='py-3 my-3'>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='/'>Evan's Best</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              <NavDropdown title='Categories' id='basic-nav-dropdown'>
                <NavDropdown.Item href='/tech'>Tech</NavDropdown.Item>
                <NavDropdown.Item href='/kitchen'>Kitchen</NavDropdown.Item>
                <NavDropdown.Item href='/outdoors'>
                  Hunting/Outdoors
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/forhim'>
                  Gift Ideas For Him
                </NavDropdown.Item>
                <NavDropdown.Item href='/forher'>
                  Gift Ideas For Her
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <p className='text-center p-2'>
        The best products, the best prices, just for you!
      </p>
    </header>
  )
}

export default Header
