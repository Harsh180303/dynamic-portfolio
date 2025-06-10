import React from 'react'

function SectionTitle({ title }) {
  return (
    <div className='flex sm:justify-start justify-center items-center gap-x-3 sm:gap-x-6  py-10'>
        <h1 className='text-sc text-2xl sm:text-3xl '>{ title }</h1>
        <div className='h-[0.075rem] w-24 sm:w-60 tertiary-color rounded-sm'></div>
    </div>
  )
}

export default SectionTitle