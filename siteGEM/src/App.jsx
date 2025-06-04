import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import './index.css'

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
