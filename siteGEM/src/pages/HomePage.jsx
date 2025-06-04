import Team from '../components/Team/Team.jsx'
import LatestArticles from '../components/LatestArticles/LatestArticles.jsx'
import Newsletter from '../components/Newsletter/Newsletter.jsx'
import RecommendedBooks from '../components/RecommendedBooks/RecommendedBooks.jsx'


const Home = () => {
  return (
    <>
      <Team />
      <LatestArticles />
      <RecommendedBooks />
      <Newsletter />
    </>
  )
}

export default Home