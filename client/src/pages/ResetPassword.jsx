import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ResetPassword() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if(location.state?.email) {
        setEmail(location.state.email)
    }
  }, [location.state])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/reset-password', {
        email,
        otp,
        newPassword,
      })

      setMsg(response.data.message)
      toast.success('Password reset successful')
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (error) {
        setMsg(error.response?.data?.message || "Error")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form 
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-lg shadow-lg w-[35%] flex flex-col gap-5"
        >
        <h2 className="text-3xl mb-6 font-bold text-center">Reset Password</h2>
      <input
        className="w-full mb-3 p-2 border border-gray-400 rounded-sm"
        type="email"
        placeholder="Email"
        value={email}
        readOnly
      />
      <input
        className="w-full mb-3 p-2 border border-gray-400 rounded-sm"
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => {
          setOtp(e.target.value)
        }}
        required
      />
      <input
        className="w-full mb-3 p-2 border border-gray-400 rounded-sm"
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value)
        }}
        required
      />

      <button type="submit"
      className="w-[50%] mx-auto cursor-pointer bg-blue-600 text-white py-2 rounded-sm hover:bg-blue-700"
      >Reset Password</button>
      <p className="text-amber-300 mb-2 text-sm">{msg}</p>
    </form>
    </div>
  )
}

export default ResetPassword