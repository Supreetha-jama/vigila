import Nav from './components/Nav'
import Hero from './sections/Hero'
import Learn from './sections/Learn'
import Symptoms from './sections/Symptoms'
import Stats from './sections/Stats'
import Companion from './sections/Companion'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Learn />
        <Symptoms />
        <Stats />
        <Companion />
      </main>
    </>
  )
}

export default App
