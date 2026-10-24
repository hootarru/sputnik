import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Audience from './components/Audience.jsx'
import Scenarios from './components/Scenarios.jsx'
import SafeSpace from './components/SafeSpace.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'
import { initAnimations } from './animations/index.js'
import './styles/calibration.css'

export default function App() {
  useEffect(() => {
    // Анимации — прогрессивное улучшение: при любой ошибке контент остаётся видимым.
    let cleanup
    try {
      cleanup = initAnimations()
    } catch (err) {
      document.documentElement.classList.remove('anim-pending')
      console.warn('[sputnik] анимации отключены:', err)
    }
    return () => cleanup && cleanup()
  }, [])

  return (
    <>
      <a className="skip-link" href="#about">Перейти к содержанию</a>
      <Navbar />
      <div className="page">
        <main>
          <Hero />
          <About />
          <Audience />
          <Scenarios />
          <SafeSpace />
          <HowItWorks />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </>
  )
}
