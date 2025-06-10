import { Form, Input, message, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

function AdminProjects() {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { portfolioData } = useSelector((state) => state.root)

  // console.log('Redux full state:', useSelector((state) => state))
  
  const { projects } = portfolioData

  const [showAddEditModal, setShowAddEditModal] = useState(false) // Modal open or not
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)
  const [type, setType] = useState('add')

  const submitHandler = async (values) => {

    let formattedValues = {
      ...values,
      technologies: values.technologies
        ? values.technologies.split(',').map((tech) => tech.trim())
        : [],
    }
    try {
      dispatch(ShowLoading())
      let response

      // update
      if (selectedItemForEdit) {
        response = await axios.put('/api/portfolio/update-project', {
          ...formattedValues,
          _id: selectedItemForEdit._id,
        })
      } else {
        // add
        response = await axios.post('/api/portfolio/add-project', formattedValues)
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
      const response = await axios.delete('/api/portfolio/delete-project', {
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
    const formattedItem = {
      ...selectedItemForEdit,
      technologies: selectedItemForEdit.technologies?.join(', '), // convert array to string for input
    }
    form.setFieldsValue(formattedItem)
  } else {
    form.resetFields()
  }
}, [selectedItemForEdit])

    // console.log('portfolioData:', portfolioData)
    // console.log('projects:', projects)


  return (
    <div>
      <div className="flex  justify-end mb-5">
        <button
          className="primary-color px-5 py-2 text-white cursor-pointer"
          onClick={() => {
            setSelectedItemForEdit(null)
            setShowAddEditModal(true)
            setType('add')

            // setTimeout helps to reset Add Project fields bcoz setSelectedItemForEdit(null) is an asynchronous operation
            
            setTimeout(() => {
            form.resetFields()
            }, 0)
          }}
        >
          Add Project
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center gap-5">
        {projects.map((project) => (
          <div className=" border-2 border-gray-400 w-full p-5 rounded-sm flex flex-col gap-y-[0.35rem]">

            <h1 className="text-2xl font-bold text-primary">{project.title}</h1>

            <img
              src={project.image}
              alt=""
              className="h-60 w-80"
            />

            <p><b>Description: </b>{project.description}</p>

            <p><b>Link:</b> <a href={project.link} className="text-blue-500 underline" target="_blank" rel="noreferrer">{project.link}</a></p>

            <p><b>Technologies:</b> {project.technologies?.join(', ')}</p>

            <div className=" flex justify-end gap-3 mt-5">
              <button
                className="text-white px-5 py-2 rounded-sm secondary-color cursor-pointer"
                onClick={() => {
                  onDelete(project)
                }}
              >
                Delete
              </button>
              <button
                className="text-white px-5 py-2 rounded-sm primary-color cursor-pointer"
                onClick={() => {
                  setSelectedItemForEdit(project)
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
          title={selectedItemForEdit ? 'Edit project' : 'Add project'}
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
            initialValues={selectedItemForEdit || {}}
          >
            <Form.Item
              name="title"
              label="Title"
            >
              <Input placeholder="Title" />
            </Form.Item>

            <Form.Item
              name="image"
              label="Image URL"
            >
              <Input placeholder="Image URL" />
            </Form.Item>

            <Form.Item
              name="link"
              label="Project Link"
            >
              <Input placeholder="Project Link" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
            >
              <TextArea placeholder="Description" />
            </Form.Item>

            <Form.Item
              name="technologies"
              label="Technologies (comma-separated)"
            >
              <Input placeholder="e.g. React,Node,MongoDB" />
            </Form.Item>

            <div className=" flex gap-5 justify-end">
              <button
                type="button"
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

export default AdminProjects
