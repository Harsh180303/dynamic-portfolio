import { Router } from 'express'
import {
  Intro,
  About,
  Project,
  Experience,
  Course,
  Contact,
} from '../models/portfolioModel.js'

const router = Router()

// get all portfolio data
router.get('/get-portfolio-data', async (req, res) => {
  try {
    const [intro, about, projects, experiences, courses, contact] =
      await Promise.all([
        Intro.findOne(),
        About.findOne(),
        Project.find(),
        Experience.find(),
        Course.find(),
        Contact.findOne(),
      ])

    res.status(200).json({
      success: true,
      data: {
        intro,
        about,
        projects,
        experiences,
        courses,
        contact,
      },
    })

    res.json({ message: 'Portfolio data success' })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
})

// update intro
router.put('/update-intro', async (req, res) => {
  try {
    const intro = await Intro.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    )
    res.status(200).send({
      data: intro,
      success: true,
      message: 'Intro updated successfully',
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.put('/update-about', async (req, res) => {
  try {
    const about = await About.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    )

    res.status(200).send({
      data: about,
      success: true,
      message: 'About update successfully',
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/add-experience', async (req, res) => {
  try {
    // console.log('idhar aa gya h')
    // console.log('Incoming body:', req.body)

    const experience = new Experience(req.body)
    await experience.save()

    return res.status(200).send({
      success: true,
      data: experience,
      message: 'Experience added successfully',
    })
  } catch (error) {
    console.log(error)
    // console.error('Error during save:', error)

    return res.status(500).send({ success: false, message: 'Server Error' })
  }
})

// update experience
router.put('/update-experience', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    )

    return res.status(200).send({
      data: experience,
      success: true,
      message: 'Experience updated successfully',
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: 'Failed to update experience' })
  }
})

// delete experience

router.delete('/delete-experience', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete({ _id: req.body._id })
    return res.status(200).send({
      data: experience,
      success: true,
      message: 'Experience deleted Successfully',
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: 'Failed to delete experience' })
  }
})

// Project routes

router.put('/update-project', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    )

    return res.status(200).send({
      success: true,
      message: 'Project updated successfully',
      data: project,
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: 'Failed to update project' })
  }
})

router.post('/add-project', async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()

    return res.status(200).send({
      success: true,
      message: 'Project added successfully',
      data: project,
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: 'Failed to add project' })
  }
})

router.delete('/delete-project', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete({ _id: req.body._id })
    return res.status(200).send({
      success: true,
      data: project,
      message: 'Project deleted successfully',
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: 'Failed to delete project' })
  }
})

// Course routes

router.put('/update-course', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    )

    return res.status(200).send({
      success: true,
      message: 'Course updated successfully',
      data: course,
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: 'Failed to update course' })
  }
})

router.post('/add-course', async (req, res) => {
  try {
    const course = new Course(req.body)
    await course.save()

    return res.status(200).send({
      success: true,
      message: 'Course added successfully',
      data: course,
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: 'Failed to add course' })
  }
})

router.delete('/delete-course', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete({ _id: req.body._id })
    return res.status(200).send({
      success: true,
      data: course,
      message: 'Course deleted successfully',
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: 'Failed to delete course' })
  }
})

// Contact route

router.put('/update-contact', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    )

    return res.status(200).send({
      success: true,
      data: contact,
      message: 'Contact updated Successfully',
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: flase, message: 'Failed to update contact' })
  }
})

export default router


