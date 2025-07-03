import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar/Navbar.jsx'
import Home from './pages/HomePage.jsx'
import SubGroups from './pages/SubGroupsPage.jsx'
// import Team from './pages/TeamPage.jsx'
import TeamPage from './pages/TeamPage.jsx'
import MemberPage from './pages/MemberPage.jsx'

import Footer from './components/Footer/Footer.jsx'
import './index.css'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/equipe' element={<TeamPage />} />
        <Route path="/equipe/:id" element={<MemberPage />} />
        <Route path='/subgrupos' element={<SubGroups />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
