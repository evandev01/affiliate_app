import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Home from './screens/Home'
import './App.css'
import Header from './components/Header'

const App = () => {
  return (
    <Router>
      <Container>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
