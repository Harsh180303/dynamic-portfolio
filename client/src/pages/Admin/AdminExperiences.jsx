import { Form, Input, message, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

function AdminExperiences() {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { portfolioData } = useSelector((state) => state.root)
  const { experiences } = portfolioData

  const [showAddEditModal, setShowAddEditModal] = useState(false) // Modal open or not
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)
  const [type, setType] = useState('add')

  const submitHandler = async (values) => {
    try {
      dispatch(ShowLoading())
      let response

      // update
      if (selectedItemForEdit) {
        response = await axios.put('/api/portfolio/update-experience', {
          ...values,
          _id: selectedItemForEdit._id,
        })
      } else {
        // add
        response = await axios.post('/api/portfolio/add-experience', values)
      }

      dispatch(HideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        setShowAddEditModal(false)
        setSelectedItemForEdit(null)
        dispatch(HideLoading())
        dispatch(ReloadData(true))
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(HideLoading())
      toast.error(error.message)
    }
  }

  // DeleteHandler
  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading())
      const response = await axios.delete('/api/portfolio/delete-experience', {
        data: { _id: item._id },
        // _id: item._id,
      })
      dispatch(HideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        dispatch(HideLoading())
        dispatch(ReloadData(true))
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(HideLoading())
      toast.error(error.message)
    }
  }

  useEffect(() => {
  if (selectedItemForEdit) {
    form.setFieldsValue(selectedItemForEdit)
  } else {
    form.resetFields()
  }
}, [selectedItemForEdit])

  return (
    <div>
      <div className="flex  justify-end mb-5">
        <button
          className="primary-color px-5 py-2 text-white cursor-pointer"
          onClick={() => {
            setSelectedItemForEdit(null)
            setShowAddEditModal(true)
            setType('add')
          }}
        >
          Add Experience
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center gap-10">
        {experiences.map((experience) => (
          <div className=" border-2 border-gray-400 w-full p-5 rounded-sm flex flex-col gap-y-[0.35rem]">
            <h1 className="text-2xl font-bold text-primary">
              {experience.period}
            </h1>
            <h1>
              <span className="font-bold">Company:</span> {experience.company}
            </h1>
            <h1>
              <span className="font-bold">Role: </span>
              {experience.title}
            </h1>
            <h1>{experience.description}</h1>

            <div className=" flex justify-end gap-3 mt-5">
              <button
                className="text-white px-5 py-2 rounded-sm secondary-color cursor-pointer"
                onClick={() => {
                  onDelete(experience)
                }}
              >
                Delete
              </button>
              <button
                className="text-white px-5 py-2 rounded-sm primary-color cursor-pointer"
                onClick={() => {
                  setSelectedItemForEdit(experience)
                  setShowAddEditModal(true)
                  setType('edit')
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {(type === 'add' || selectedItemForEdit) && (
        <Modal
          open={showAddEditModal}
          title={selectedItemForEdit ? 'Edit Experience' : 'Add Experience'}
          footer={null}
          onCancel={() => {
            setShowAddEditModal(false)
            setSelectedItemForEdit(null)
            form.resetFields()
          }}
          className="z-10" // don't know how is it working but surprisingly it is working
        >
          <Form
            layout="vertical"
            form={form}
            onFinish={submitHandler}
            // initialValues={selectedItemForEdit || {}}
          >
            <Form.Item
              name="period"
              label="Period"
            >
              <Input placeholder="Period" />
            </Form.Item>
            <Form.Item
              name="company"
              label="Company"
            >
              <Input placeholder="Company" />
            </Form.Item>
            <Form.Item
              name="title"
              label="Title"
            >
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
            >
              <TextArea placeholder="Description" />
            </Form.Item>

            <div className=" flex gap-5 justify-end">
              <button
                className="border-primary border text-primary px-5 py-2 rounded-sm cursor-pointer"
                onClick={() => {
                  setShowAddEditModal(false)
                  setSelectedItemForEdit(null)
                  form.resetFields()
                }}
              >
                Cancel
              </button>

              <button className="primary-color text-white px-5 py-2 rounded-sm cursor-pointer">
                {selectedItemForEdit ? 'Update' : 'Add'}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  )
}

export default AdminExperiences
