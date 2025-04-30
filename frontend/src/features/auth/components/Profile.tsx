'use client';

import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaIdCard, FaVenusMars, FaMapMarkerAlt, FaBirthdayCake, FaEdit, FaCamera } from 'react-icons/fa';

interface UserProfileProps {
  userId?: string;
}

type GenderType = 0 | 1 | 2; // 0: Nam, 1: Nữ, 2: Khác

interface UserProfile {
  id: string;
  username: string;
  email: string;
  detail_user: {
    name: string;
    avatar?: string;
    dob?: string;
    address?: string;
    gender: GenderType;
  };
}

export const Profile: React.FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile> | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Load user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call using the userId
        // For this example, we're using mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Fetch from our mockdata
        const mockUser: UserProfile = {
          id: "1",
          username: "johndoe",
          email: "johndoe@example.com",
          detail_user: {
            name: "John Doe",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            dob: "1990-05-15",
            address: "123 Main Street, City",
            gender: 0
          }
        };
        
        setUser(mockUser);
        setEditForm(mockUser);
      } catch (err) {
        setError('Failed to load user profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditForm(prev => ({
        ...prev,
        [parent]: {
          ...prev?.[parent as keyof UserProfile] as any,
          [child]: value
        }
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        if (editForm) {
          setEditForm({
            ...editForm,
            detail_user: {
              ...editForm.detail_user as any,
              avatar: reader.result as string
            }
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // In a real app, this would be an API call to update the user profile
      // For this example, we're simulating the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state with the edited data
      if (editForm) {
        setUser(editForm as UserProfile);
      }
      
      setIsEditing(false);
      setUpdateSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center text-red-600 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Error Loading Profile</h2>
          <p className="text-gray-600 text-center">{error}</p>
          <div className="mt-6 text-center">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        {updateSuccess && (
          <div className="mb-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">Thông tin cá nhân đã được cập nhật thành công.</span>
          </div>
        )}
        
        <div className="bg-white shadow overflow-hidden rounded-lg">
          {/* Profile Header */}
          <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-700 to-purple-600 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-white">Thông tin cá nhân</h3>
              <p className="mt-1 max-w-2xl text-sm text-indigo-100">Thông tin chi tiết và cài đặt tài khoản</p>
            </div>
            <div>
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaEdit className="mr-2" />
                  Chỉnh sửa
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditForm(user);
                    setImagePreview(null);
                  }}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Hủy
                </button>
              )}
            </div>
          </div>
          
          {/* Avatar Section */}
          <div className="border-t border-gray-200 px-4 py-5 flex justify-center">
            <div className="relative">
              <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100">
                {isEditing && imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-full w-full object-cover" 
                  />
                ) : (
                  <img 
                    src={user?.detail_user.avatar || "https://via.placeholder.com/150"} 
                    alt={user?.detail_user.name} 
                    className="h-full w-full object-cover" 
                  />
                )}
              </div>
              {isEditing && (
                <div className="absolute bottom-0 right-0">
                  <label htmlFor="avatar-upload" className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full">
                    <FaCamera />
                    <input 
                      id="avatar-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {isEditing ? (
            /* Edit Form */
            <div className="border-t border-gray-200">
              <form onSubmit={handleSubmit}>
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <FaUser className="mr-2" />
                      Họ và tên
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="detail_user.name"
                        value={editForm?.detail_user?.name || ''}
                        onChange={handleInputChange}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </dd>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <FaEnvelope className="mr-2" />
                      Email
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="email"
                        name="email"
                        value={editForm?.email || ''}
                        onChange={handleInputChange}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </dd>
                  </div>
                  
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <FaUser className="mr-2" />
                      Username
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="username"
                        value={editForm?.username || ''}
                        onChange={handleInputChange}
                        className="bg-gray-100 block w-full sm:text-sm border-gray-300 rounded-md"
                        disabled
                      />
                      <p className="text-xs text-gray-500 mt-1">Không thể thay đổi username</p>
                    </dd>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <FaVenusMars className="mr-2" />
                      Giới tính
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        name="detail_user.gender"
                        value={editForm?.detail_user?.gender || 0}
                        onChange={handleInputChange}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value={0}>Nam</option>
                        <option value={1}>Nữ</option>
                        <option value={2}>Khác</option>
                      </select>
                    </dd>
                  </div>
                  
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <FaBirthdayCake className="mr-2" />
                      Ngày sinh
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="date"
                        name="detail_user.dob"
                        value={editForm?.detail_user?.dob || ''}
                        onChange={handleInputChange}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </dd>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <FaMapMarkerAlt className="mr-2" />
                      Địa chỉ
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <textarea
                        name="detail_user.address"
                        value={editForm?.detail_user?.address || ''}
                        onChange={handleInputChange}
                        rows={3}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </dd>
                  </div>
                </dl>
                
                <div className="px-4 py-5 bg-white flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm(user);
                      setImagePreview(null);
                    }}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                      loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang lưu...
                      </>
                    ) : (
                      'Lưu thay đổi'
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* View Profile */
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FaUser className="mr-2" />
                    Họ và tên
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.detail_user.name}
                  </dd>
                </div>
                
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FaEnvelope className="mr-2" />
                    Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.email}
                  </dd>
                </div>
                
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FaUser className="mr-2" />
                    Username
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.username}
                  </dd>
                </div>
                
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FaVenusMars className="mr-2" />
                    Giới tính
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.detail_user.gender === 0 ? 'Nam' : 
                     user?.detail_user.gender === 1 ? 'Nữ' : 'Khác'}
                  </dd>
                </div>
                
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FaBirthdayCake className="mr-2" />
                    Ngày sinh
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.detail_user.dob ? new Date(user.detail_user.dob).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                  </dd>
                </div>
                
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    Địa chỉ
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.detail_user.address || 'Chưa cập nhật'}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;