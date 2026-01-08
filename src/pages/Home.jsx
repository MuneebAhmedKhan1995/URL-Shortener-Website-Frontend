import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShortenForm from '../components/URLShortener/ShortenForm';
import { FaRocket, FaChartBar, FaShieldAlt, FaBolt } from 'react-icons/fa';

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Shorten Your <span className="text-primary-600">URLs</span> Instantly
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Create short, memorable links and track their performance with our powerful analytics dashboard.
        </p>
        
        {isAuthenticated ? (
          <ShortenForm />
        ) : (
          <div className="space-x-4">
            <Link to="/register" className="btn-primary text-lg px-8 py-3">
              Get Started Free
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-3">
              Login
            </Link>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our URL Shortener?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <FaBolt className="text-4xl text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
            <p className="text-gray-600">
              Generate short URLs instantly with our optimized processing system.
            </p>
          </div>

          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <FaChartBar className="text-4xl text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Powerful Analytics</h3>
            <p className="text-gray-600">
              Track clicks, geographic data, and referral sources with detailed insights.
            </p>
          </div>

          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <FaShieldAlt className="text-4xl text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
            <p className="text-gray-600">
              Military-grade security with 99.9% uptime guarantee for your links.
            </p>
          </div>

          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <FaRocket className="text-4xl text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Easy Integration</h3>
            <p className="text-gray-600">
              Simple API and clean interface for seamless integration with your workflow.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Shorten Your First URL?
        </h2>
        <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust our platform for their URL shortening needs.
        </p>
        <Link
          to={isAuthenticated ? "/dashboard" : "/register"}
          className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg inline-block"
        >
          {isAuthenticated ? 'Go to Dashboard' : 'Start Free Trial'}
        </Link>
      </section>
    </>
  );
};

export default Home;