import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, Users, Award, ArrowRight, Check } from 'lucide-react';
import { mockReviews, mockPackages } from '../data/mockData';
import { fetchHello } from '../api/apiClient';

const Home: React.FC = () => {
  const [backendMessage, setBackendMessage] = useState<string>('');
  const featuredPackages = mockPackages.slice(0, 3);
  const recentReviews = mockReviews.slice(0, 3);

  useEffect(() => {
    async function getMessage() {
      try {
        const message = await fetchHello();
        setBackendMessage(message);
      } catch (error) {
        setBackendMessage('Failed to fetch from backend');
      }
    }
    getMessage();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Backend Message Section */}
      <section className="bg-green-100 text-green-900 py-4 text-center font-semibold">
        {backendMessage ? backendMessage : 'Loading backend message...'}
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your Look at 
                <span className="text-yellow-300"> Elegance Salon</span>
              </h1>
              <p className="text-xl mb-8 text-purple-100">
                Experience premium beauty services in a luxurious environment. 
                Our expert team is here to make you look and feel amazing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/booking"
                  className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors duration-300 text-center"
                >
                  Book Appointment
                </Link>
                <Link
                  to="/packages"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-900 transition-colors duration-300 text-center"
                >
                  View Services
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
                alt="Salon Interior"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-purple-900 p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-lg">4.9</span>
                </div>
                <p className="text-sm text-gray-600">500+ Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, number: '500+', label: 'Happy Clients' },
              { icon: Award, number: '50+', label: 'Awards Won' },
              { icon: Calendar, number: '5+', label: 'Years Experience' },
              { icon: Star, number: '4.9', label: 'Average Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular beauty treatments designed to enhance your natural beauty
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ${pkg.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-600 font-medium">{pkg.duration} minutes</span>
                    <Link
                      to={`/booking?package=${pkg.id}`}
                      className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 font-medium"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/packages"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Elegance Salon?</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're committed to providing exceptional beauty services that exceed your expectations. 
                Here's what makes us special:
              </p>
              <div className="space-y-4">
                {[
                  'Expert stylists with years of experience',
                  'Premium quality products and equipment',
                  'Personalized consultation for every client',
                  'Relaxing and luxurious salon environment',
                  'Flexible booking and payment options',
                  'Satisfaction guarantee on all services'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3985357/pexels-photo-3985357.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
                alt="Salon Treatment"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real experiences from our valued customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentReviews.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{review.comment}"</p>
                <div className="flex items-center">
                  <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                    alt="Customer"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Satisfied Customer</div>
                    <div className="text-sm text-gray-500">Verified Customer</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/reviews"
              className="text-purple-600 hover:text-purple-800 font-semibold text-lg"
            >
              Read More Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Look?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Book your appointment today and experience the difference at Elegance Salon
          </p>
          <Link
            to="/booking"
            className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors duration-300 inline-block"
          >
            Book Your Appointment Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;