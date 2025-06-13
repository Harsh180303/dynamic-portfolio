import React from 'react'
import logo from '../../public/logo.png'

function Header() {
  return (
    <div className=' primary-color flex justify-between font-semibold text-xl sm:text-3xl'>
        <img src={logo} alt='logo' className='h-18 w-auto' />
    </div>
  )
}

export default Header