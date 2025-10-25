import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
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
    <nav className="navbar-gradient text-white shadow-2xl fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold tracking-tight hover:scale-110 transition">
          RealEstateHub
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-lg font-semibold hover:text-yellow-300 transition">Home</Link>
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
        </div>

        {/* Mobile */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-3xl font-bold"
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/20 backdrop-blur-xl border-t border-white/30">
          <div className="container mx-auto px-6 py-6 space-y-4">
            <Link to="/" className="block text-xl font-bold hover:text-yellow-300">Home</Link>
            {isLoggedIn ? (
              <>
                <Link to="/add" className="block text-xl font-bold hover:text-yellow-300">Add Property</Link>
                <button onClick={handleLogout} className="w-full text-left btn-danger">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-xl font-bold hover:text-yellow-300">Login</Link>
                <Link to="/register" className="block text-xl font-bold hover:text-yellow-300">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}