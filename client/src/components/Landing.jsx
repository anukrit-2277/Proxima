import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Proxima
          </h1>
          <p className="text-2xl mb-8 text-blue-100">Where Developers Connect & Collaborate</p>
          <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-300">
            Swipe through developer profiles, find your next collaboration partner, 
            and build amazing projects together. The Tinder for developers!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="btn btn-primary btn-lg bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </button>
            <button
              className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-slate-900"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-white/10 backdrop-blur-sm text-white border border-white/20">
            <div className="card-body text-center">
              <div className="text-4xl mb-4">👨‍💻</div>
              <h3 className="card-title justify-center text-blue-200">Find Developers</h3>
              <p className="text-gray-300">Discover talented developers with skills that match your project needs</p>
            </div>
          </div>
          
          <div className="card bg-white/10 backdrop-blur-sm text-white border border-white/20">
            <div className="card-body text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="card-title justify-center text-blue-200">Connect & Network</h3>
              <p className="text-gray-300">Build meaningful professional relationships in the developer community</p>
            </div>
          </div>
          
          <div className="card bg-white/10 backdrop-blur-sm text-white border border-white/20">
            <div className="card-body text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="card-title justify-center text-blue-200">Collaborate</h3>
              <p className="text-gray-300">Work together on exciting projects and bring your ideas to life</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
