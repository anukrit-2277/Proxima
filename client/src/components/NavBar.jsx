import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'

const NavBar = () => {
  const userInfo = useSelector((store) => store.user)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const handleLogoClick = () => {
    if (userInfo?.data) {
      navigate('/feed')
    } else {
      navigate('/login')
    }
  }

  const handleLogOut = async () => {
    try {
      const result = await axios.post('http://localhost:1700/logout', {}, { withCredentials: true })
      console.log(result?.data?.message)
      dispatch(removeUser())
      navigate('/login')
    } catch (err) {
      console.log(err.message)
    }
  }

  const isActive = (path) => location.pathname === path

  if (!userInfo?.data) {
    return (
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <button className="btn btn-ghost text-xl text-white hover:text-white" onClick={handleLogoClick}>
            Proxima
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className={`btn btn-ghost text-white hover:text-white ${isActive('/login') ? 'btn-active' : ''}`}
            onClick={() => {
              console.log('Login button clicked');
              navigate('/login');
            }}
          >
            Login
          </button>
          <button
            className={`btn btn-primary ${isActive('/signup') ? 'btn-active' : ''}`}
            onClick={() => {
              console.log('Signup button clicked');
              navigate('/signup');
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <button className="btn btn-ghost text-xl text-white hover:text-white" onClick={handleLogoClick}>
          Proxima
        </button>
      </div>
      
      {/* Navigation Links */}
      <div className="flex gap-2 mx-2">
        <button
          className={`btn btn-ghost btn-sm ${isActive('/feed') ? 'btn-active' : ''}`}
          onClick={() => navigate('/feed')}
        >
          Feed
        </button>
        <button
          className={`btn btn-ghost btn-sm ${isActive('/connections') ? 'btn-active' : ''}`}
          onClick={() => navigate('/connections')}
        >
          Connections
        </button>
        <button
          className={`btn btn-ghost btn-sm ${isActive('/requests') ? 'btn-active' : ''}`}
          onClick={() => navigate('/requests')}
        >
          Requests
        </button>
      </div>

      {/* User Menu */}
      <div className="flex gap-2 mx-2">
        <p className="text-sm hidden sm:block">
          {userInfo?.data?.firstName ? `Welcome, ${userInfo?.data?.firstName}` : ''}
        </p>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src={userInfo?.data?.photoURL || 'https://w7.pngwing.com/pngs/910/606/png-transparent-head-the-dummy-avatar-man-tie-jacket-user-thumbnail.png'}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <button
                className="justify-between"
                onClick={() => navigate('/profile')}
              >
                Profile
                <span className="badge">New</span>
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/connections')}>
                My Connections
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/requests')}>
                Requests
              </button>
            </li>
            <li>
              <button onClick={handleLogOut}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar