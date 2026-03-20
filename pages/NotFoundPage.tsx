import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 px-4 text-center">
        <h1 className="text-7xl font-serif font-bold text-stone-500 mb-4">404</h1>
        <h2 className="text-2xl font-serif text-stone-800 mb-2">Page not found</h2>
        <p className="text-stone-500 max-w-md mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors text-sm font-medium"
          >
            Go Home
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-100 transition-colors text-sm font-medium"
          >
            Contact Us
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap gap-6 justify-center text-sm text-stone-500">
          <Link to="/products" className="hover:text-stone-600 transition-colors">Products</Link>
          <Link to="/services" className="hover:text-stone-600 transition-colors">Services</Link>
          <Link to="/blog" className="hover:text-stone-600 transition-colors">Blog</Link>
          <Link to="/work" className="hover:text-stone-600 transition-colors">Our Work</Link>
        </div>
      </div>
    </>
  );
};
