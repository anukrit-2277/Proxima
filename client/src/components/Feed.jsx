import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FeedCard from './FeedCard'

const Feed = () => {
  const [usersData, setUsersData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:1700/user/feed?page=${page}&limit=3`, {
        withCredentials: true
      })
      
      const newUsers = response?.data?.data || []
      
      if (page === 1) {
        setUsersData(newUsers)
      } else {
        setUsersData(prev => [...prev, ...newUsers])
      }
      
      // Check if we have more users to load
      setHasMore(newUsers.length === 3)
      setError('')
    } catch (err) {
      console.error('Error fetching users:', err.message)
      setError('Failed to load users. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(1)
  }, [])

  const handleUserAction = (userId) => {
    // Remove the user from the current feed
    setUsersData(prev => prev.filter(user => user._id !== userId))
    
    // If we have no more users, try to load more
    if (usersData.length <= 1 && hasMore) {
      loadMore()
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1
      setCurrentPage(nextPage)
      fetchUsers(nextPage)
    }
  }

  const refreshFeed = () => {
    setCurrentPage(1)
    setUsersData([])
    setHasMore(true)
    fetchUsers(1)
  }

  if (loading && usersData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Finding Amazing Developers</h3>
          <p className="text-gray-600">Please wait while we load the best profiles for you...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              className="btn btn-primary btn-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={refreshFeed}
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (usersData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">All Caught Up!</h3>
            <p className="text-gray-600 mb-6">You've seen all available developers. Check back later for new profiles!</p>
            <button 
              className="btn btn-primary btn-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={refreshFeed}
            >
              🔄 Refresh Feed
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Discover Developers
            </h1>
            <p className="text-gray-600 text-lg">Find your next collaboration partner</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{usersData.length}</div>
                <div className="text-sm text-gray-500">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">∞</div>
                <div className="text-sm text-gray-500">Connections</div>
              </div>
            </div>
            <button 
              className="btn btn-outline btn-sm"
              onClick={refreshFeed}
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Feed Cards */}
        <div className="max-w-md mx-auto">
          {usersData.map((user, index) => (
            <div 
              key={user._id}
              className={`transform transition-all duration-300 ${
                index === 0 ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
              }`}
              style={{
                zIndex: usersData.length - index,
                position: index === 0 ? 'relative' : 'absolute',
                top: index * 20,
                left: '50%',
                transform: `translateX(-50%) ${index === 0 ? 'scale(1)' : 'scale(0.95)'}`,
                width: '100%'
              }}
            >
              <FeedCard
                {...user}
                onAction={handleUserAction}
              />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && usersData.length > 0 && (
          <div className="text-center mt-12">
            <button
              className="btn btn-primary btn-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={loadMore}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Loading...
                </>
              ) : (
                <>
                  <span className="mr-2">✨</span>
                  Load More Developers
                </>
              )}
            </button>
          </div>
        )}

        {/* Empty State */}
        {usersData.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">All Caught Up!</h3>
            <p className="text-gray-600 mb-6">You've seen all available developers. Check back later for new profiles!</p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={refreshFeed}
            >
              🔄 Refresh Feed
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Feed