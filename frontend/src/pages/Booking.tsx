import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Phone, Mail, Check, CreditCard } from 'lucide-react';
import { mockPackages } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const preselectedPackageId = searchParams.get('package');
  
  const [formData, setFormData] = useState({
    packageId: preselectedPackageId || '',
    date: '',
    time: '',
    contactMethod: 'whatsapp' as 'whatsapp' | 'email',
    contactInfo: user?.phone || user?.email || '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        contactInfo: prev.contactMethod === 'whatsapp' ? (user.phone || '') : (user.email || '')
      }));
    }
  }, [user, formData.contactMethod]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to be signed in to book an appointment.</p>
          <button
            onClick={() => navigate('/login', { state: { from: { pathname: '/booking' } } })}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Sign In to Book
          </button>
        </div>
      </div>
    );
  }

  const selectedPackage = mockPackages.find(pkg => pkg.id === formData.packageId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactMethodChange = (method: 'whatsapp' | 'email') => {
    setFormData(prev => ({
      ...prev,
      contactMethod: method,
      contactInfo: method === 'whatsapp' ? (user?.phone || '') : (user?.email || '')
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bookingData = {
        packageId: formData.packageId,
        date: formData.date,
        time: formData.time,
        contactMethod: formData.contactMethod,
        contactInfo: formData.contactInfo,
        notes: formData.notes,
        customerEmail: user?.email || ''
      };

      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      setSubmitted(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('Error submitting booking: ' + error.message);
      } else {
        alert('Error submitting booking');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 18 && minute > 0) break;
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your appointment request has been submitted. We'll contact you via {formData.contactMethod} 
            at {formData.contactInfo} to confirm your booking.
          </p>
          <div className="space-y-2 mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              View My Bookings
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  packageId: '',
                  date: '',
                  time: '',
                  contactMethod: 'whatsapp',
                  contactInfo: user?.phone || user?.email || '',
                  notes: ''
                });
              }}
              className="w-full text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors border border-purple-200"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Appointment</h1>
          <p className="text-xl text-gray-600">Choose your service and preferred time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Service
                </label>
                <select
                  name="packageId"
                  value={formData.packageId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Choose a service...</option>
                  {mockPackages.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} - ${pkg.price} ({pkg.duration} min)
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Select Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Select Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Choose a time...</option>
                  {generateTimeSlots().map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              {/* Contact Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred Contact Method for Confirmation
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => handleContactMethodChange('whatsapp')}
                    className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-colors ${
                      formData.contactMethod === 'whatsapp'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 text-gray-700 hover:border-green-300'
                    }`}
                  >
                    <Phone className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleContactMethodChange('email')}
                    className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-colors ${
                      formData.contactMethod === 'email'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.contactMethod === 'whatsapp' ? 'WhatsApp Number' : 'Email Address'}
                </label>
                <input
                  type={formData.contactMethod === 'whatsapp' ? 'tel' : 'email'}
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={formData.contactMethod === 'whatsapp' ? 'Enter your WhatsApp number' : 'Enter your email address'}
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Any special requests or notes..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Book Appointment'}
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            {selectedPackage && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Service Details</h3>
                <div className="space-y-4">
                  <img
                    src={selectedPackage.image}
                    alt={selectedPackage.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">{selectedPackage.name}</h4>
                    <p className="text-gray-600 mt-1">{selectedPackage.description}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{selectedPackage.duration} minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-xl text-purple-600">${selectedPackage.price}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-purple-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Confirmation via your preferred method</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Free cancellation up to 24 hours before</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Payment can be made at the salon</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-purple-600" />
                  <span>We accept cash and card payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;