import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
// import bcrypt, { genSalt } from 'bcrypt'

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    // Match password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' })
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30m',
    })

    console.log("TOKEN ----> ", token)
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Login failed' })
  }
}

export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body
    const isExist = await User.findOne({ email: email })
    if (isExist) {
      return res
        .status(402)
        .json({ success: false, message: 'User already exist' })
    }

    // const hashedPassword = bcrypt.hash(password, genSalt(10))

    const newUser = new User({
        name,
        email,
        password,
        // password: hashedPassword,
    })

    await newUser.save()
    return res.status(201).json({
        success: true,
        message: "Admin created"
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Failed to register',
    })
  }
}
