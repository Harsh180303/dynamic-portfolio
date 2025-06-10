import React from 'react'
import { useSelector } from 'react-redux'

function Intro() {
  const { portfolioData } = useSelector((state) => state.root)
  const { intro } = portfolioData
  const { firstName, lastName, welcomeText, description, caption } = intro
  return (
    <div className='h-[70vh] md:h-[86vh] primary-color flex flex-col items-start pt-6 text-white gap-4 sm:gap-6 justify-center '>
      <h1 className='sm:text-3xl font-semibold'>{welcomeText || ""}</h1>
      <h1 className='sm:text-7xl text-[2.1rem] font-bold text-sc '>I'm {firstName || ""} {lastName || ""}</h1>
      <h1 className='sm:text-7xl font-bold text-[2rem]'>{caption || ""}</h1>
      <p className='sm:w-[60%] sm:text-[1.18rem] my-0.5'>{description || ""}</p>
      <button className='border-2 border-tertiary sm:text-[1.2rem] px-4 py-2 sm:px-9 sm:py-3 text-tertiary rounded cursor-pointer'>Get Started</button>
    </div>
  )
}

export default Intro