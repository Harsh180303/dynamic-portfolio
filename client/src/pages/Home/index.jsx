import React from 'react'
import Header from '../../components/Header'
import About from './About'
import Intro from './Intro'
import Experiences from './Experiences'
import Projects from './Projects'
import Courses from './Courses'
import Contact from './Contact'
import Footer from './Footer'
import LeftSider from './LeftSider'
import { useSelector } from 'react-redux'

function Home() {
    const { portfolioData } = useSelector((state) => state.root)
  return (
    <div className=' p-4 sm:p-10 primary-color sm:px-40 overflow-x-hidden'>
      <Header />
      {portfolioData && <div>
        <Intro />
        <About/>
        <Experiences />
        <Projects />
        <Courses />
        <Contact />
        <Footer />
        <LeftSider />
      </div>}
    </div>
  )
}

export default Home
