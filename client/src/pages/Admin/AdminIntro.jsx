import React from 'react'
import { Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoading, HideLoading } from "../../redux/rootSlice"
import axios from 'axios'
import { toast } from 'react-toastify'

function AdminIntro() {

  const { portfolioData } = useSelector((state) => state.root)
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading())
      const response = await axios.put("/api/portfolio/update-intro", {
        ...values,
        _id: portfolioData.intro._id,
      })
      dispatch(HideLoading())
      if(response.data.success) {
        toast.success(response.data.message)
      }else {
        toast.error(response.data.message)
      }
    } catch(error) {
      dispatch(HideLoading())
      toast.error(error.message)
    }
  }
  
  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.intro} className='input-wrapper'>
        <Form.Item name="welcomeText" label="Welcome Text">
          <Input placeholder='Welcome Text' className='custom-input' />
        </Form.Item>
        <Form.Item name="firstName" label="First Name">
          <Input placeholder='First Name' className='custom-input' />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name">
          <Input placeholder='Last Name' className='custom-input' />
        </Form.Item>
        <Form.Item name="caption" label="Caption">
          <Input placeholder='Caption' className='custom-input' />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder='Description' className='custom-input' />
        </Form.Item>

        <div className='flex justify-end'>
          <button className='px-10 py-2 primary-color text-white rounded-[0.25rem] font-semibold' type='submit'>SAVE</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminIntro