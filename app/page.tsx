import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import OurStory from './components/OurStory'
import WeddingDetails from './components/WeddingDetails'
import Gallery from './components/Gallery'
import Venue from './components/Venue'
import RSVP from './components/RSVP'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Countdown />
      <OurStory />
      <WeddingDetails />
      <Gallery />
      <Venue />
      <RSVP />
      <FAQ />
      <Footer />
    </main>
  )
}