import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/images/logo.svg" 
                alt="Mantoma Logo" 
                className="h-10 w-10 mr-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%2316a34a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E";
                }}
              />
              <span className="text-2xl font-bold text-primary-600">Mantoma</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Beranda
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium">
              Tentang
            </Link>
            <Link to="/detection" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200">
              Mulai Deteksi
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-3">
            <Link
              to="/"
              className="block text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang
            </Link>
            <Link
              to="/detection"
              className="block text-center bg-primary-600 text-white hover:bg-primary-700 py-2.5 px-4 rounded-lg font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Mulai Deteksi
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;