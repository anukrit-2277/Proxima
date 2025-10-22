import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { addUser } from '../utils/userSlice'

export const Profile = () => {
  const userInfo = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    skills: [],
    photoURL: '',
    about: ''
  })
  const [newSkill, setNewSkill] = useState('')

  useEffect(() => {
    if (userInfo?.data) {
      setFormData({
        firstName: userInfo.data.firstName || '',
        lastName: userInfo.data.lastName || '',
        age: userInfo.data.age || '',
        gender: userInfo.data.gender || '',
        skills: userInfo.data.skills || [],
        photoURL: userInfo.data.photoURL || '',
        about: userInfo.data.about || ''
      })
    }
  }, [userInfo])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await axios.put('http://localhost:1700/profile', formData, {
        withCredentials: true
      })
      dispatch(addUser(response.data))
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      firstName: userInfo.data.firstName || '',
      lastName: userInfo.data.lastName || '',
      age: userInfo.data.age || '',
      gender: userInfo.data.gender || '',
      skills: userInfo.data.skills || [],
      photoURL: userInfo.data.photoURL || '',
      about: userInfo.data.about || ''
    })
    setIsEditing(false)
  }

  if (!userInfo?.data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Profile</h1>
            {!isEditing && (
              <button 
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={formData.photoURL} alt="Profile" />
                </div>
              </div>
              {isEditing && (
                <div className="form-control w-full max-w-xs mt-4">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="url"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="Enter photo URL"
                  />
                </div>
              )}
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input input-bordered"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Age</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Gender</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="select select-bordered"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">About</span>
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="textarea textarea-bordered h-24"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Skills Section */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Skills</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="badge badge-primary gap-2">
                      {skill}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="btn btn-ghost btn-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="input input-bordered flex-1"
                      placeholder="Add a skill"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="btn btn-outline btn-sm"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="card-actions justify-end mt-6">
              <button
                className="btn btn-ghost"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
