import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar/Navbar.jsx'
import Home from './pages/HomePage.jsx'
import SubGroups from './pages/SubGroupsPage.jsx'

import Footer from './components/Footer/Footer.jsx'
import './index.css'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/subgrupos' element={<SubGroups />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
