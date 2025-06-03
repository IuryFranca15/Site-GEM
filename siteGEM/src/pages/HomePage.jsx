import Header from '../Components/Navbar.jsx'
import Team from '../Components/Team/Team.jsx'
import LatestArticles from '../Components/LatestArticles/LatestArticles.jsx'
import Newsletter from '../Components/Newsletter/Newsletter.jsx'
import SubGroups from '../Components/SubGroups/SubGroups.jsx'
import Footer from '../Components/Footer.jsx'

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