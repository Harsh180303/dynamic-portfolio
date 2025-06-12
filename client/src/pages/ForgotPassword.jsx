import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/forgot-password', { email })
      setMsg(response.data.message)

      setTimeout(() => {
        navigate('/reset-password', {state: { email }})
      }, 1500)
    } catch (error) {
        console.log(error)
      setMsg(error.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 py-8 rounded-lg shadow-lg w-[20%] flex flex-col gap-5"
        onSubmit={submitHandler}
      >
        <div className="text-3xl mb-6 font-bold text-center">Forgot Password</div>
        <input
          className="w-full mb-3 p-2 border rounded-sm"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="w-[50%] mx-auto cursor-pointer bg-blue-600 text-white py-2 rounded-sm hover:bg-blue-700"
          type="submit"
        >
          Send OTP
        </button>
        <p className="text-amber-300 mb-2 text-sm">{msg}</p>
      </form>
    </div>
  )
}

export default ForgotPassword