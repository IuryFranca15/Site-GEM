import BackgroundVideo from '../components/BackgroundVideo/BackgroundVideo.jsx'
import Team from '../components/Team/Team.jsx'
import LatestArticles from '../components/LatestArticles/LatestArticles.jsx'
import Newsletter from '../components/Newsletter/Newsletter.jsx'
import RecommendedBooks from '../components/RecommendedBooks/RecommendedBooks.jsx'
import PolicyBriefs from '../components/PolicyBriefs/PolicyBriefs.jsx'
import book from '../assets/image/book-1.avif'

const Home = () => {
  return (
    <>
      <BackgroundVideo />
      <Team modo="geral" />
      <PolicyBriefs
        images={[
          { src: book, link: '#' },
          { src: book, link: '#' },
          { src: book, link: '#' },
          { src: book, link: '#' },
          { src: book, link: '#' },
        ]} />
      <LatestArticles />
      <RecommendedBooks />
      <Newsletter />
    </>
  )
}

export default Home 