import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Connections = () => {
  const [connections, setConnections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchConnections = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:1700/user/connections', {
        withCredentials: true
      })
      setConnections(response?.data?.data || [])
      setError('')
    } catch (err) {
      console.error('Error fetching connections:', err.message)
      setError('Failed to load connections. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConnections()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4">Loading connections...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="alert alert-error max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
          <button className="btn btn-primary mt-4" onClick={fetchConnections}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Connections</h1>
        <p className="text-base-content/70">
          {connections.length > 0 
            ? `You have ${connections.length} connection${connections.length === 1 ? '' : 's'}`
            : 'No connections yet'
          }
        </p>
      </div>

      {connections.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤝</div>
          <h2 className="text-2xl font-bold mb-4">No connections yet</h2>
          <p className="text-base-content/70 mb-6">
            Start swiping in the feed to find developers you'd like to connect with!
          </p>
          <a href="/feed" className="btn btn-primary">
            Go to Feed
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => (
            <div key={connection._id} className="card bg-base-100 shadow-xl">
              <figure className="px-6 pt-6">
                <div className="avatar">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={connection.photoURL}
                      alt={`${connection.firstName} ${connection.lastName}`}
                    />
                  </div>
                </div>
              </figure>
              <div className="card-body text-center">
                <h2 className="card-title justify-center text-xl">
                  {connection.firstName} {connection.lastName}
                </h2>
                
                <p className="text-sm text-base-content/70 mb-4">
                  {connection.about}
                </p>

                {connection.skills && connection.skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {connection.skills.slice(0, 4).map((skill, index) => (
                        <div key={index} className="badge badge-outline badge-sm">
                          {skill}
                        </div>
                      ))}
                      {connection.skills.length > 4 && (
                        <div className="badge badge-outline badge-sm">
                          +{connection.skills.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="card-actions justify-center">
                  <button className="btn btn-outline btn-sm">
                    View Profile
                  </button>
                  <button className="btn btn-primary btn-sm">
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Connections
