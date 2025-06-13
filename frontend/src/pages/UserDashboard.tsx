import React, { useState } from 'react';
import { Calendar, Clock, Star, CreditCard, User, Bell, Settings } from 'lucide-react';
import { mockBookings, mockPackages, mockReviews } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');

  const userBookings = mockBookings.filter(booking => booking.userId === user?.id);
  const userReviews = mockReviews.filter(review => review.userId === user?.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'bookings', name: 'My Bookings', icon: Calendar },
    { id: 'reviews', name: 'My Reviews', icon: Star },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
              <p className="text-purple-100">Manage your appointments and profile</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
                  {userBookings.length > 0 ? (
                    <div className="space-y-4">
                      {userBookings.map((booking) => {
                        const bookingPackage = mockPackages.find(pkg => pkg.id === booking.packageId);
                        return (
                          <div key={booking.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg text-gray-900">{bookingPackage?.name}</h3>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{booking.time}</span>
                                  </div>
                                </div>
                                {booking.notes && (
                                  <p className="text-sm text-gray-600 mt-2">Note: {booking.notes}</p>
                                )}
                              </div>
                              <div className="flex flex-col items-end space-y-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                                  Payment: {booking.paymentStatus}
                                </span>
                                <span className="text-lg font-bold text-purple-600">
                                  ${bookingPackage?.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No bookings yet</p>
                      <p className="text-gray-400">Your appointments will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Reviews</h2>
                  {userReviews.length > 0 ? (
                    <div className="space-y-4">
                      {userReviews.map((review) => {
                        const reviewPackage = mockPackages.find(pkg => pkg.id === review.packageId);
                        return (
                          <div key={review.id} className="border border-gray-200 rounded-xl p-6">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-semibold text-lg text-gray-900">{reviewPackage?.name}</h3>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-5 w-5 ${
                                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 mb-3">{review.comment}</p>
                            <p className="text-sm text-gray-500">
                              Posted on {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No reviews yet</p>
                      <p className="text-gray-400">Share your experience after your appointment</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="h-10 w-10 text-purple-600" />
                      </div>
                      <button className="text-purple-600 hover:text-purple-700 font-medium">
                        Change Photo
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={user?.name || ''}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={user?.phone || ''}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                        <input
                          type="text"
                          value={user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : ''}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                        Edit Profile
                      </button>
                      <button className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                      <Bell className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-blue-900">Appointment Confirmed</h3>
                        <p className="text-blue-700 text-sm">Your appointment for Classic Haircut & Style has been confirmed for tomorrow at 2:00 PM</p>
                        <p className="text-blue-600 text-xs mt-2">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                      <CreditCard className="h-6 w-6 text-green-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-green-900">Payment Successful</h3>
                        <p className="text-green-700 text-sm">Payment of $45 for your recent service has been processed successfully</p>
                        <p className="text-green-600 text-xs mt-2">1 day ago</p>
                      </div>
                    </div>

                    <div className="text-center py-8">
                      <p className="text-gray-500">No more notifications</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;