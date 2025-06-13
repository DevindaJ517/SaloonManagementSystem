import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Scissors } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid email or password');
    }
  };

  const demoAccounts = [
    { email: 'admin@salon.com', password: 'admin123', role: 'Admin' },
    { email: 'head@salon.com', password: 'head123', role: 'Head Employee' },
    { email: 'employee@salon.com', password: 'emp123', role: 'Employee' },
    { email: 'user@example.com', password: 'user123', role: 'Customer' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center">
              <Scissors className="h-12 w-12 text-yellow-300" />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-white">Welcome Back</h2>
            <p className="mt-2 text-purple-100">Sign in to your account</p>
          </div>

          {/* Demo Accounts */}
          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <h3 className="text-sm font-medium text-white mb-2">Demo Accounts:</h3>
            <div className="space-y-1 text-xs text-purple-100">
              {demoAccounts.map((account, index) => (
                <div key={index} className="flex justify-between">
                  <span>{account.role}:</span>
                  <span>{account.email} / {account.password}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-100 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-200 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-yellow-300 focus:ring-yellow-300 border-white/20 rounded bg-white/10"
                />
                <span className="ml-2 text-sm text-purple-100">Remember me</span>
              </label>
              <button type="button" className="text-sm text-yellow-300 hover:text-yellow-200">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-400 text-purple-900 py-3 px-4 rounded-lg font-semibold hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-purple-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="text-center">
              <span className="text-purple-100">Don't have an account? </span>
              <Link to="/register" className="text-yellow-300 hover:text-yellow-200 font-medium">
                Sign up here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;