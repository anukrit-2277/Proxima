import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Landing from './Landing'

export const Body = () => {
  const userInfo = useSelector((store) => store.user)

  return (
    <>
      <NavBar/>
      {userInfo?.data ? <Outlet/> : <Landing/>}
      <Footer/>
    </>
  )
}
