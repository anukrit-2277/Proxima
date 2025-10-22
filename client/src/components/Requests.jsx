import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Requests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:1700/user/requests/received', {
        withCredentials: true
      })
      setRequests(response?.data?.data || [])
      setError('')
    } catch (err) {
      console.error('Error fetching requests:', err.message)
      setError('Failed to load requests. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRequestAction = async (requestId, action) => {
    try {
      await axios.post(
        `http://localhost:1700/request/review/${action}/${requestId}`,
        {},
        { withCredentials: true }
      )
      
      // Remove the request from the list
      setRequests(prev => prev.filter(req => req._id !== requestId))
    } catch (err) {
      console.error(`Error ${action}ing request:`, err.message)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4">Loading requests...</p>
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
          <button className="btn btn-primary mt-4" onClick={fetchRequests}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Connection Requests</h1>
        <p className="text-base-content/70">
          {requests.length > 0 
            ? `You have ${requests.length} pending request${requests.length === 1 ? '' : 's'}`
            : 'No pending requests'
          }
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📬</div>
          <h2 className="text-2xl font-bold mb-4">No pending requests</h2>
          <p className="text-base-content/70 mb-6">
            When someone likes your profile, you'll see their request here.
          </p>
          <a href="/feed" className="btn btn-primary">
            Go to Feed
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => (
            <div key={request._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  {/* Profile Picture */}
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={request.fromUserId.photoURL}
                        alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                      />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">
                      {request.fromUserId.firstName} {request.fromUserId.lastName}
                    </h3>
                    <p className="text-base-content/70 mb-2">
                      {request.fromUserId.about}
                    </p>

                    {/* Skills */}
                    {request.fromUserId.skills && request.fromUserId.skills.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {request.fromUserId.skills.slice(0, 5).map((skill, index) => (
                            <div key={index} className="badge badge-outline badge-sm">
                              {skill}
                            </div>
                          ))}
                          {request.fromUserId.skills.length > 5 && (
                            <div className="badge badge-outline badge-sm">
                              +{request.fromUserId.skills.length - 5}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Request Info */}
                    <div className="text-sm text-base-content/60">
                      <p>Sent {new Date(request.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleRequestAction(request._id, 'accepted')}
                    >
                      ✓ Accept
                    </button>
                    <button
                      className="btn btn-outline btn-error btn-sm"
                      onClick={() => handleRequestAction(request._id, 'rejected')}
                    >
                      ✗ Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Requests
