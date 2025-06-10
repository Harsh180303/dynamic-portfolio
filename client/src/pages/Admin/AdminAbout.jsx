import React from 'react'
import { Form, Input, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoading, HideLoading } from "../../redux/rootSlice"
import axios from 'axios'
import { toast } from 'react-toastify'

function AdminAbout() {

  const { portfolioData } = useSelector((state) => state.root)
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading())
      const response = await axios.put("/api/portfolio/update-about", {
        ...values,
        _id: portfolioData.about._id,
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
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.about} className='input-wrapper'>
        <Form.Item name="lottieURL" label="Lottie URL">
          <Input placeholder='Lottie URL' className='custom-input' />
        </Form.Item>
        <Form.Item name="description1" label="Description 1">
          <Input.TextArea style={{minHeight: '5rem'}} placeholder='Description 1' className='custom-input' />
        </Form.Item>
        <Form.Item name="description2" label="Description 2">
          <Input.TextArea style={{minHeight: '5rem'}} placeholder='2' className='custom-input' />
        </Form.Item>
        <Form.Item name="skills" label="Skills">
          <Select
            mode="tags"
            style={{ width: '100%', overflowX: 'auto' }}
            placeholder="Enter your skills"
            className="custom-input"
          />
        </Form.Item>

        <div className='flex justify-end'>
          <button className='px-10 py-2 primary-color text-white rounded-[0.25rem] font-semibold' type='submit'>SAVE</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminAbout