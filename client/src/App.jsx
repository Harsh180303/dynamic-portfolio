import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Home from './pages/Home'
import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {
  SetPortfolioData,
  ShowLoading,
  HideLoading,
  ReloadData,
} from './redux/rootSlice'
import Admin from './pages/Admin'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

function App() {
  const { loading, portfolioData, reloadData } = useSelector(
    (state) => state.root
  )
  const dispatch = useDispatch()

  const getPortfolioData = async () => {
    try {
      dispatch(ShowLoading())
      const response = await axios.get('/api/portfolio/get-portfolio-data')
      dispatch(SetPortfolioData(response.data.data))
      dispatch(ReloadData(false))
      dispatch(HideLoading())
    } catch (error) {
      dispatch(HideLoading())
      // console.log(error)
    }
  }

  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData()
    }
  }, [portfolioData])

  useEffect(() => {
    if (reloadData) {
      getPortfolioData()
    }
  }, [reloadData])

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log(portfolioData)
  //   }, 2000);
  // }, [])

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />

      {loading ? <Loader /> : null}
      <Routes>
        <Route
          path="/"
          element={<Home />}
        ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />}/>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
