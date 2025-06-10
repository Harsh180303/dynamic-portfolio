import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux'

function About() {
  const { portfolioData } = useSelector((state) => state.root)
  const { about } = portfolioData
  const { description1, description2, lottieURL, skills } = about

  return (
    <div>
      <SectionTitle title="About Me" />

      <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-x-10">
        <div className="sm:h-[70vh] h-[50vh] w-auto flex-shrink-0 overflow-hidden">
          <dotlottie-player
            src={lottieURL || ''}
            background="transparent"
            speed="1"
            autoplay
          ></dotlottie-player>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-white sm:text-[1.18rem]">{description1 || ''}</p>
          <p className="text-white sm:text-[1.18rem]">{description2 || ''}</p>
        </div>
      </div>

      <div className="py-5">
        <h1 className="text-tertiary text-xl">
          Here are a few technologies I've been working with recently:
        </h1>
        <div className="flex flex-wrap gap-4 sm:gap-10 mt-10 justify-center sm:justify-start">
          {skills.map((skill, index) => (
            <div className="">
              <h1 className="text-tertiary border py-2 sm:py-3 px-5 sm:px-10 text-center  text-lg font-bold border-tertiary">
                {skill}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
