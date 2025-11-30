import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">One<span className="text-green-500">Society</span></h2>
          <p className="text-gray-400 text-sm">
            Your ultimate destination for the latest environmental events, community reviews, and insightful news articles. Join us in making a difference!
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-green-500 transition-all">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-green-500 transition-all">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-green-500 transition-all">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-green-500 transition-all">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-500">Home</a></li>
            <li><a href="#" className="hover:text-green-500">Events</a></li>
            <li><a href="#" className="hover:text-green-500">Reviews</a></li>
            <li><a href="#" className="hover:text-green-500">News</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-500">About Us</a></li>
            <li><a href="#" className="hover:text-green-500">Contact</a></li>
            <li><a href="#" className="hover:text-green-500">FAQs</a></li>
            <li><a href="#" className="hover:text-green-500">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-3">Subscribe to get the latest updates and event news.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-gray-900 rounded-l-md focus:outline-none"
            />
            <button className="bg-green-600 px-4 py-2 rounded-r-md text-white hover:bg-red-700 transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        <p>© 2025 OneSociety. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
