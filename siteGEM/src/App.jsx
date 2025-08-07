import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar/Navbar.jsx'
import Home from './pages/HomePage.jsx'
import SubGroups from './pages/SubGroupsPage.jsx'
// import Team from './pages/TeamPage.jsx'
import TeamPage from './pages/TeamPage.jsx'
import MemberPage from './pages/MemberPage.jsx'
import GroupPage from './pages/GroupPage.jsx'
import Publications from './pages/PublicationsPage.jsx'
import History from './components/History/History.jsx'

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
        <Route path="/grupo/:id" element={<GroupPage />} />
        <Route path='/publicacoes' element={<Publications />} />
        <Route path='/historia' element={<History />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
