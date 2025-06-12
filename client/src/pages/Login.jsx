import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/auth/login', { email, password })
            localStorage.setItem('token', response.data.token)
            navigate('/admin')
        } catch (error) {
            console.log(error)
            setError(error.response?.data?.message || 'Login Failed')
        }
    }
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg w-[35%] flex flex-col gap-5"
      >
        <h2 className="text-xl mb-4 font-bold text-center">Admin Login</h2>

        {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded-sm"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded-sm"
        />

        <p className='text-[#0000EE] visited:text-[#551A8B]'>
          <Link to="/forgot-password">Forgot Password</Link>
        </p>

        <button
          type="submit"
          className="w-[50%] mx-auto cursor-pointer bg-blue-600 text-white py-2 rounded-sm hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
