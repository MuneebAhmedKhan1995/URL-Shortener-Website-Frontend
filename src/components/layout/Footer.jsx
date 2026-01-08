import React from 'react';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">Shortly</h3>
            <p className="text-gray-400 mt-2">Shorten your URLs in seconds</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaGithub size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-400">
            Made with <FaHeart className="inline text-red-500" /> for Technext 2026
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © {new Date().getFullYear()} URL Shortener. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;