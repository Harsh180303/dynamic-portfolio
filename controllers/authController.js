import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

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

    // console.log("TOKEN ----> ", token)
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

    const newUser = new User({
        name,
        email,
        password,
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

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email: email })
    if(!user) {
      return res.status(404).json({success: false, message: "User not found"})
    }

    // Generate OTP and hashed OTP will be saved in our DB
    const otp = crypto.randomInt(100000, 999999).toString()
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex')

    user.resetPasswordToken = hashedOTP
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000
    await user.save()

    // Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    })
    // console.log(user.email)
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Reset Your Password",
      text: "This OTP is only valid for 10 minutes",
      html: `<p>Your OTP for password reset is: <b>${otp}</b></p>`,
    }

    await transporter.sendMail(mailOptions)

    return res.status(200).json({ success: true, message: "OTP sent to your email"})
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: "Failed to send OTP"})
  }
}


export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body
    const user = await User.findOne({ email: email})
    if(!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    if(Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({
        success: false,
        message: 'Your OTP has been expired'
      })
    }

    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex')
    if(user.resetPasswordToken !== hashedOTP) {
        return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.password = newPassword
    user.resetPasswordExpires = null
    user.resetPasswordToken = null
    await user.save()

    return res.status(200).json({
      success: true,
      message: 'Password reset successful'
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Reset failed"
    })
  }
}