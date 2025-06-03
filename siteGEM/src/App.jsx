import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage.jsx'
import Navbar from './Components/Navbar.jsx'
import Footer from './Components//Footer.jsx'
import './App.css'

function App() {


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
