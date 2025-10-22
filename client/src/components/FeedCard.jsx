import React, { useState } from 'react'
import axios from 'axios'

const FeedCard = ({ _id, firstName, lastName, age, skills, photoURL, about, onAction }) => {
  const [loading, setLoading] = useState(false)
  const [actionTaken, setActionTaken] = useState(false)

  const handleAction = async (action) => {
    if (loading || actionTaken) return

    setLoading(true)
    try {
      await axios.post(
        `http://localhost:1700/request/send/${action}/${_id}`,
        {},
        { withCredentials: true }
      )
      
      setActionTaken(true)
      // Call parent callback to remove this card from feed
      if (onAction) {
        onAction(_id)
      }
    } catch (error) {
      console.error(`Error ${action}ing user:`, error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = () => handleAction('interested')
  const handleDislike = () => handleAction('ignored')

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Profile Image */}
        <div className="relative h-80 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={photoURL}
            alt={`${firstName} ${lastName}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Online Status */}
          <div className="absolute top-4 right-4">
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-gray-800">
              {firstName} {lastName}
            </h2>
            {age && (
              <span className="text-gray-500 font-medium">{age} years</span>
            )}
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {about}
          </p>
          
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 4).map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {skills.length > 4 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    +{skills.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              className={`flex-1 py-3 px-4 rounded-2xl font-semibold text-white transition-all duration-200 ${
                loading || actionTaken 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-500 hover:bg-red-600 hover:shadow-lg transform hover:scale-105'
              }`}
              onClick={handleDislike}
              disabled={loading || actionTaken}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="text-xl mr-2">👎</span>
                  Pass
                </div>
              )}
            </button>
            
            <button
              className={`flex-1 py-3 px-4 rounded-2xl font-semibold text-white transition-all duration-200 ${
                loading || actionTaken 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg transform hover:scale-105'
              }`}
              onClick={handleLike}
              disabled={loading || actionTaken}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="text-xl mr-2">💙</span>
                  Connect
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedCard