import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  User,
  Star,
  Phone,
  Mail,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Filter,
  Search,
  Download,
  BarChart3,
  PieChart
} from 'lucide-react';
import { mockPackages, mockEmployees, mockActivities } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [bookingFilter, setBookingFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error('Failed to fetch bookings', err));
  }, []);

  // Calculate statistics
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status.toLowerCase() === 'pending').length;
  const completedBookings = bookings.filter(b => b.status.toLowerCase() === 'completed').length;
  const totalRevenue = bookings
    .filter(b => b.status.toLowerCase() === 'completed' && b.paymentStatus === 'paid')
    .reduce((sum, b) => {
      const pkg = mockPackages.find(p => p.id === b.packageId);
      return sum + (pkg?.price || 0);
    }, 0);

  const monthlyRevenue = 2850; // Mock data
  const totalUsers = mockUsers.length;
  const activeEmployees = mockEmployees.length;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'bad': return 'text-red-600 bg-red-100';
      case 'neutral': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleBookingAction = async (bookingId: string, action: 'approve' | 'reject') => {
    try {
      const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}/status?status=${action === 'approve' ? 'Approved' : 'Rejected'}`, {
        method: 'PUT'
      });
      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }
      const updatedBooking = await response.json();
      setBookings(prev => prev.map(b => b.id === updatedBooking.id ? updatedBooking : b));
      setSelectedBooking(null);
    } catch (error) {
      alert('Error updating booking status: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (bookingFilter === 'all') return true;
    return booking.status.toLowerCase() === bookingFilter.toLowerCase();
  });

  const [users, setUsers] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Failed to fetch users', err));
  }, []);

  const filteredUsers = users.filter(user => {
    if (userFilter === 'all') return true;
    return user.activityStatus === userFilter;
  });

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'bookings', name: 'Bookings', icon: Calendar },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'employees', name: 'Employees', icon: User },
    { id: 'payments', name: 'Payments', icon: DollarSign },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-purple-100">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                <Download className="h-5 w-5" />
              </button>
              <button className="bg-yellow-400 text-purple-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
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
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Bookings</p>
                        <p className="text-3xl font-bold text-gray-900">{totalBookings}</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500">+12%</span>
                      <span className="text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Revenue</p>
                        <p className="text-3xl font-bold text-gray-900">${totalRevenue}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500">+8%</span>
                      <span className="text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Active Users</p>
                        <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-full">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500">+15%</span>
                      <span className="text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Pending Bookings</p>
                        <p className="text-3xl font-bold text-gray-900">{pendingBookings}</p>
                      </div>
                      <div className="bg-yellow-100 p-3 rounded-full">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-yellow-500">Needs attention</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Bookings</h3>
                    <div className="space-y-4">
                      {mockBookings.slice(0, 5).map((booking) => {
                        const pkg = mockPackages.find(p => p.id === booking.packageId);
                        const user = mockUsers.find(u => u.id === booking.userId);
                        return (
                          <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{user?.name}</p>
                                <p className="text-sm text-gray-600">{pkg?.name}</p>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Top Services</h3>
                    <div className="space-y-4">
                      {mockPackages.slice(0, 5).map((pkg, index) => (
                        <div key={pkg.id} className="flex items-center justify-between">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{pkg.name}</p>
                            <p className="text-sm text-gray-600">${pkg.price}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{Math.floor(Math.random() * 20) + 5} bookings</p>
                            <p className="text-sm text-gray-600">this month</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                    <h2 className="text-2xl font-bold text-gray-900">Booking Management</h2>
                    <div className="flex items-center space-x-4">
                      <select
                        value={bookingFilter}
                        onChange={(e) => setBookingFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="all">All Bookings</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Customer</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Service</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Date & Time</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Payment</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookings.map((booking) => {
                          const pkg = mockPackages.find(p => p.id === booking.packageId);
                          const customer = mockUsers.find(u => u.id === booking.userId);
                          return (
                            <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <User className="h-5 w-5 text-purple-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{customer?.name}</p>
                                    <p className="text-sm text-gray-600">{customer?.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <p className="font-medium text-gray-900">{pkg?.name}</p>
                                <p className="text-sm text-gray-600">${pkg?.price}</p>
                              </td>
                              <td className="py-4 px-4">
                                <p className="font-medium text-gray-900">{new Date(booking.date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-600">{booking.time}</p>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                  {booking.status}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  booking.paymentStatus === 'paid' ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'
                                }`}>
                                  {booking.paymentStatus}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => setSelectedBooking(booking)}
                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  {booking.status === 'pending' && (
                                    <>
                                      <button
                                        onClick={() => handleBookingAction(booking.id, 'approve')}
                                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                      >
                                        <CheckCircle className="h-4 w-4" />
                                      </button>
                                      <button
                                        onClick={() => handleBookingAction(booking.id, 'reject')}
                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                      >
                                        <XCircle className="h-4 w-4" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                    <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                    <div className="flex items-center space-x-4">
                      <select
                        value={userFilter}
                        onChange={(e) => setUserFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="all">All Users</option>
                        <option value="good">Good Activity</option>
                        <option value="neutral">Neutral Activity</option>
                        <option value="bad">Bad Activity</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => {
                      const userBookings = bookings.filter(b => b.userId === user.id);
                      const completedBookings = userBookings.filter(b => b.status === 'completed').length;
                      const noShows = userBookings.filter(b => b.status === 'no_show').length;
                      
                      return (
                        <div key={user.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <User className="h-6 w-6 text-purple-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                                <p className="text-sm text-gray-600">{user.email}</p>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium mt-2 ${getActivityStatusColor(user.activityStatus)}`}>
                              {user.activityStatus} customer
                            </span>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Total Bookings:</span>
                              <span className="font-medium">{userBookings.length}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Completed:</span>
                              <span className="font-medium text-green-600">{completedBookings}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">No Shows:</span>
                              <span className="font-medium text-red-600">{noShows}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Member Since:</span>
                              <span className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => setSelectedUser(user)}
                            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'employees' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                    <h2 className="text-2xl font-bold text-gray-900">Employee Management</h2>
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2">
                      <UserPlus className="h-5 w-5" />
                      <span>Add Employee</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockEmployees.map((employee) => (
                      <div key={employee.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={employee.avatar}
                              alt={employee.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                              <p className="text-sm text-gray-600 capitalize">{employee.role.replace('_', ' ')}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Mail className="h-4 w-4" />
                            <span>{employee.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Phone className="h-4 w-4" />
                            <span>{employee.phone}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {employee.skills.map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                          <div>
                            <p className="text-sm text-gray-600">Total Earnings</p>
                            <p className="font-bold text-lg text-green-600">${employee.totalEarnings}</p>
                          </div>
                          <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Tracking</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-green-50 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-600 font-medium">Total Revenue</p>
                          <p className="text-3xl font-bold text-green-700">${totalRevenue}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-600 font-medium">Cash Payments</p>
                          <p className="text-3xl font-bold text-blue-700">${Math.floor(totalRevenue * 0.6)}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-600 font-medium">Bank Payments</p>
                          <p className="text-3xl font-bold text-purple-700">${Math.floor(totalRevenue * 0.4)}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Customer</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Service</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Method</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockBookings.filter(b => b.status === 'completed').map((booking) => {
                          const pkg = mockPackages.find(p => p.id === booking.packageId);
                          const customer = mockUsers.find(u => u.id === booking.userId);
                          return (
                            <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-4 px-4">
                                <p className="font-medium text-gray-900">{customer?.name}</p>
                              </td>
                              <td className="py-4 px-4">
                                <p className="font-medium text-gray-900">{pkg?.name}</p>
                              </td>
                              <td className="py-4 px-4">
                                <p className="font-bold text-green-600">${pkg?.price}</p>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  booking.paymentMethod === 'cash' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {booking.paymentMethod || 'cash'}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  booking.paymentStatus === 'paid' ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'
                                }`}>
                                  {booking.paymentStatus}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <p className="text-gray-600">{new Date(booking.date).toLocaleDateString()}</p>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics & Reports</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
                      <div className="h-64 flex items-end justify-between space-x-2">
                        {[2100, 2400, 2800, 3200, 2900, 3100].map((value, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div 
                              className="bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg w-8"
                              style={{ height: `${(value / 3200) * 200}px` }}
                            ></div>
                            <span className="text-xs text-gray-600 mt-2">
                              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Popularity</h3>
                      <div className="space-y-4">
                        {mockPackages.slice(0, 5).map((pkg, index) => {
                          const percentage = Math.floor(Math.random() * 40) + 20;
                          return (
                            <div key={pkg.id}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-700">{pkg.name}</span>
                                <span className="text-gray-600">{percentage}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Booking Details</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Name:</span> {mockUsers.find(u => u.id === selectedBooking.userId)?.name}</p>
                    <p><span className="text-gray-600">Email:</span> {mockUsers.find(u => u.id === selectedBooking.userId)?.email}</p>
                    <p><span className="text-gray-600">Phone:</span> {mockUsers.find(u => u.id === selectedBooking.userId)?.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Service Information</h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Service:</span> {mockPackages.find(p => p.id === selectedBooking.packageId)?.name}</p>
                    <p><span className="text-gray-600">Price:</span> ${mockPackages.find(p => p.id === selectedBooking.packageId)?.price}</p>
                    <p><span className="text-gray-600">Duration:</span> {mockPackages.find(p => p.id === selectedBooking.packageId)?.duration} min</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Booking Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p><span className="text-gray-600">Date:</span> {new Date(selectedBooking.date).toLocaleDateString()}</p>
                  <p><span className="text-gray-600">Time:</span> {selectedBooking.time}</p>
                  <p><span className="text-gray-600">Status:</span> 
                    <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                      {selectedBooking.status}
                    </span>
                  </p>
                  <p><span className="text-gray-600">Payment:</span> 
                    <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                      selectedBooking.paymentStatus === 'paid' ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'
                    }`}>
                      {selectedBooking.paymentStatus}
                    </span>
                  </p>
                </div>
              </div>

              {selectedBooking.notes && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Notes</h4>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedBooking.notes}</p>
                </div>
              )}

              {selectedBooking.status === 'pending' && (
                <div className="flex space-x-4 pt-6 border-t">
                  <button
                    onClick={() => handleBookingAction(selectedBooking.id, 'approve')}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Approve Booking
                  </button>
                  <button
                    onClick={() => handleBookingAction(selectedBooking.id, 'reject')}
                    className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Reject Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">User Profile & History</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-10 w-10 text-purple-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{selectedUser.name}</h4>
                    <p className="text-gray-600">{selectedUser.email}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getActivityStatusColor(selectedUser.activityStatus)}`}>
                      {selectedUser.activityStatus} customer
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{selectedUser.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Member Since:</span>
                      <span className="font-medium">{new Date(selectedUser.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Bookings:</span>
                      <span className="font-medium">{mockBookings.filter(b => b.userId === selectedUser.id).length}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Booking History</h4>
                    <div className="space-y-3">
                      {mockBookings.filter(b => b.userId === selectedUser.id).map((booking) => {
                        const pkg = mockPackages.find(p => p.id === booking.packageId);
                        return (
                          <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{pkg?.name}</p>
                              <p className="text-sm text-gray-600">{new Date(booking.date).toLocaleDateString()} at {booking.time}</p>
                            </div>
                            <div className="text-right">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                              <p className="text-sm text-gray-600 mt-1">${pkg?.price}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h4>
                    <div className="space-y-3">
                      {mockActivities.filter(a => a.userId === selectedUser.id).map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                          <div className={`w-3 h-3 rounded-full mt-2 ${
                            activity.status === 'positive' ? 'bg-green-500' : 
                            activity.status === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{activity.description}</p>
                            <p className="text-sm text-gray-600">{new Date(activity.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
