import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Home from './pages/Home'
import './App.css'
import Header from './components/Header'
import Login from './pages/Login'
import ProductEdit from './pages/ProductEdit'

const App = () => {
  return (
    <Router>
      <Container>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/edit' element={<ProductEdit />} />
          <Route path='/edit/:id' element={<ProductEdit />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
