import mongoose, { Schema } from 'mongoose'

const introSchema = new Schema({
  welcomeText: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    minLength: 3,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 3,
    trim: true,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
    timestamps: true,
})

const aboutSchema = new Schema({
  lottieURL: {
    type: String,
    required: true,
  },
  description1: {
    type: String,
    required: true,
  },
  description2: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
}, {
    timestamps: true,
})

const experienceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
    timestamps: true,
})

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description1: {
    type: String,
    // required: true,
  },
  description2: {
    type: String,
    // required: true,
  },
  link: {
    type: String,
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
}, {
    timestamps: true,
})

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
}, {
    timestamps: true,
})

const contactSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    age: {
        type: Number,
        min: 1,
        max: 120,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

export const Intro = mongoose.model('Intro', introSchema)
export const About = mongoose.model('About', aboutSchema)
export const Experience = mongoose.model('Experience', experienceSchema)
export const Project = mongoose.model('Project', projectSchema)
export const Course = mongoose.model('Course', courseSchema)
export const Contact = mongoose.model('Contact', contactSchema)