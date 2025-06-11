import React from 'react'
import { Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoading, HideLoading } from "../../redux/rootSlice"
import axios from 'axios'
import { toast } from 'react-toastify'

function AdminContact() {
  const token = localStorage.getItem('token')
  const { portfolioData } = useSelector((state) => state.root)
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading())
      const response = await axios.put("/api/portfolio/update-contact", {
        ...values,
        _id: portfolioData.contact._id,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
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
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.contact} className='input-wrapper'>

        <Form.Item name="name" label="Name">
          <Input placeholder='Enter your name' className='custom-input' />
        </Form.Item>

        <Form.Item name="age" label="Age">
          <Input placeholder='Age' className='custom-input' />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input.TextArea placeholder='Email' className='custom-input' />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Input.TextArea placeholder='Gender' className='custom-input' />
        </Form.Item>
        <Form.Item name="mobile" label="Mobile">
          <Input.TextArea placeholder='Mobile' className='custom-input' />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input.TextArea placeholder='Address' className='custom-input' />
        </Form.Item>

        <div className='flex justify-end'>
          <button className='px-10 py-2 primary-color text-white rounded-[0.25rem] font-semibold' type='submit'>SAVE</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminContact