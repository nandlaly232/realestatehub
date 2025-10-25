import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';  // New icons

export default function Navbar({ darkMode, setDarkMode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 text-white shadow-2xl fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold tracking-tight hover:scale-110 transition">RealEstateHub</Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-lg font-semibold hover:text-yellow-300 transition">Home</Link>
          {isLoggedIn && <Link to="/dashboard" className="text-lg font-semibold hover:text-yellow-300 transition">Dashboard</Link>}
          {isLoggedIn ? (
            <>
              <Link to="/add" className="text-lg font-semibold hover:text-yellow-300 transition">Add Property</Link>
              <button onClick={handleLogout} className="btn-danger">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-lg font-semibold hover:text-yellow-300 transition">Login</Link>
              <Link to="/register" className="btn-success">Register</Link>
            </>
          )}
          <button onClick={() => setDarkMode(!darkMode)} className="text-2xl">
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-3xl">Menu</button>
      </div>
      {/* Mobile Menu – similar to before, add dark toggle */}
    </nav>
  );
}