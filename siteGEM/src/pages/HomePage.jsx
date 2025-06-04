import Header from '../components/Navbar.jsx'
import Team from '../components/Team/Team.jsx'
import LatestArticles from '../components/LatestArticles/LatestArticles.jsx'
import Newsletter from '../components/Newsletter/Newsletter.jsx'
import SubGroups from '../components/SubGroups/SubGroups.jsx'
import Footer from '../components/Footer/Footer.jsx'

const Home = () => {
  return (
    <>
      <Team />
      <LatestArticles />
      <Newsletter />
    </>
  )
}

export default Home