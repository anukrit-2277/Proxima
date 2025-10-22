import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from './NavBar'
import Footer from './Footer'

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
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

  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First name and last name are required')
      return false
    }
    if (!formData.emailId.trim()) {
      setError('Email is required')
      return false
    }
    if (!formData.password) {
      setError('Password is required')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      const response = await axios.post('http://localhost:1700/signup', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailId: formData.emailId,
        password: formData.password
      })

      console.log('Signup successful:', response.data)
      // Redirect to login page after successful signup
      navigate('/login')
    } catch (error) {
      console.error('Signup error:', error)
      setError(error.response?.data || 'Signup failed. Please try again.')
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
                Join Proxima
              </h1>
              <p className="text-2xl text-blue-100 font-light">Connect with developers worldwide</p>
              <p className="text-lg text-gray-300 mt-4">Start your journey in the developer community</p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center space-x-6 group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🌟</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Free to Join</h3>
                  <p className="text-blue-100">No hidden fees, completely free forever</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Quick Setup</h3>
                  <p className="text-blue-100">Get started in under 2 minutes</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🔒</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                  <p className="text-blue-100">Your data is always protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Branding */}
            <div className="text-center mb-12 lg:hidden">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Join Proxima
              </h1>
              <p className="text-xl text-white">Connect with developers worldwide</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-blue-100">Start your developer journey today</p>
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none backdrop-blur-sm"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none backdrop-blur-sm"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

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
                    placeholder="john@example.com"
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
                    placeholder="Create a strong password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none backdrop-blur-sm"
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                <div className="flex items-start">
                  <input type="checkbox" className="mt-1 rounded border-white/30 text-blue-400 focus:ring-blue-400 bg-white/10" required />
                  <label className="ml-3 text-sm text-white">
                    I agree to the{' '}
                    <a href="#" className="text-blue-300 hover:text-blue-200 font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-300 hover:text-blue-200 font-medium">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-105"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="text-xl mr-2">✨</span>
                      Create Account
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
                    <span className="px-4 bg-transparent text-white/70">Already have an account?</span>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-center text-sm text-white/80">
                    <button
                      className="font-semibold text-blue-300 hover:text-blue-200 transition-colors"
                      onClick={() => navigate('/login')}
                    >
                      Sign in instead
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

export default Signup