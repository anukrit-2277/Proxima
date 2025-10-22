import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

const Login = () => {
  const [formData, setFormData] = useState({
    emailId: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleLogIn = async (e) => {
    e.preventDefault()
    
    if (!formData.emailId || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await axios.post(
        "http://localhost:1700/login",
        { emailId: formData.emailId, password: formData.password },
        { withCredentials: true }
      )
      
      dispatch(addUser(result.data))
      navigate("/feed")
    } catch (err) {
      console.error('Login error:', err)
      setError(err.response?.data || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <NavBar/>
      
      {/* Main Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="text-white text-center max-w-lg">
            <div className="mb-12">
              <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Proxima
              </h1>
              <p className="text-2xl text-blue-100 font-light">Where Developers Connect</p>
              <p className="text-lg text-gray-300 mt-4">The ultimate platform for developer networking and collaboration</p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center space-x-6 group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">👨‍💻</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Find Amazing Developers</h3>
                  <p className="text-blue-100">Discover talented developers from around the world</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🤝</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Build Connections</h3>
                  <p className="text-blue-100">Create meaningful professional relationships</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Collaborate & Create</h3>
                  <p className="text-blue-100">Work together on incredible projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 pb-20">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Branding */}
            <div className="text-center mb-12 lg:hidden">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Proxima
              </h1>
              <p className="text-xl text-white">Where Developers Connect</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-blue-100">Sign in to continue your journey</p>
              </div>
              
              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-200 text-sm">{error}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleLogIn} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none backdrop-blur-sm"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none backdrop-blur-sm"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-white/30 text-blue-400 focus:ring-blue-400 bg-white/10" />
                    <span className="ml-3 text-sm text-white">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-blue-300 hover:text-blue-200 font-medium transition-colors">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-105"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Signing In...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="text-xl mr-2">🚀</span>
                      Sign In
                    </div>
                  )}
                </button>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-white/70">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-center text-sm text-white/80">
                    Don't have an account?{' '}
                    <button
                      className="font-semibold text-blue-300 hover:text-blue-200 transition-colors"
                      onClick={() => navigate('/signup')}
                    >
                      Sign up for free
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}

export default Login