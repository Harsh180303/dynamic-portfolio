import React from 'react'
import Header from '../../components/Header'
import { Tabs } from 'antd'
import AdminIntro from './AdminIntro'
import AdminAbout from './AdminAbout'
import AdminExperiences from "./AdminExperiences"
import AdminProjects from "./AdminProjects"
import { useSelector } from 'react-redux'
import AdminCourses from './AdminCourses'
import AdminContact from './AdminContact'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const { loading, portfolioData } = useSelector((state) => state.root)
  const navigate = useNavigate()

  const LogoutHandler = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  
  const onChange = (key) => {
    console.log(key)
  }

  const items = [
    {
      key: '1',
      label: 'Intro',
      children: <AdminIntro />,
    },
    {
      key: '2',
      label: 'About',
      children: <AdminAbout />,
    },
    {
      key: '3',
      label: 'Experiences',
      children: <AdminExperiences />,
    },
    {
      key: '4',
      label: 'Projects',
      children: <AdminProjects />
    },
    {
      key: '5',
      label: 'Courses',
      children: <AdminCourses />
    },
    {
      key: '6',
      label: 'Contact',
      children: <AdminContact />
    },
  ]

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <div className="flex justify-between py-4 primary-color px-10 sm:px-10 overflow-x-hidden w-screen items-center">
        <Header />
        <button onClick={LogoutHandler} className='secondary-color px-4 h-10 font-semibold cursor-pointer'>Logout</button>
      </div>
        <h1 className='px-10 pt-4 text-3xl text-primary font-bold'>Admin Pannel</h1>

      {portfolioData && (
        <div className="py-4 px-10 bg-white">
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            // tabPosition='left'
          />
        </div>
      )}
    </div>
  )
}

export default Admin
