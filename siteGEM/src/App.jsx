import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Inicial from './pages/inicial'
import Navbar from './components/navbar'
import Footer from './components/footer'
import './App.css'

function App() {
  

  return (
    <BrowserRouter>
      
    <Navbar />

      <Routes>

        <Route path='/' element={<Inicial />} />





      </Routes>
    
    <Footer />

    </BrowserRouter>

    
  )
}

export default App
