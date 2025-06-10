import React from 'react'
import SectionTitle from '../../components/SectionTitle'

function Footer() {
  return (
    <div className="flex flex-col opacity-70">
      <div className="w-full my-10 h-[1px] tertiary-color justify-center items-center"></div>
      <div className="text-white flex flex-col justify-center items-center sm:text-[1.18rem]">
        <p>Designed and Developed By</p>
        <p>Harsh Chourasiya</p>
      </div>
    </div>
  )
}

export default Footer
