import { useEffect, useState } from 'react';
import { getProperties } from '../services/api';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';  // New icons

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({ location: '', type: '', minPrice: 0, maxPrice: 1000000 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await getProperties(filters);
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="text-center py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h1 className="text-6xl font-bold mb-4">Find Your Dream Home</h1>
        <p className="text-xl mb-8">Discover amazing properties with ease</p>
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
          <input placeholder="Location" value={filters.location} onChange={e => setFilters({...filters, location: e.target.value})} className="input-field" />
          <select value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})} className="input-field">
            <option value="">Any Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
          </select>
          <input type="range" min="0" max="1000000" value={filters.maxPrice} onChange={e => setFilters({...filters, maxPrice: e.target.value})} className="input-field" />
          <button type="submit" className="btn-primary">Search</button>
        </form>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div></div>
      ) : (
        <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((p) => (
            <div key={p.id} className="card">
              <div className="relative">
                <img src={p.images?.[0] || 'https://via.placeholder.com/400x300'} alt={p.title} className="w-full h-64 object-cover" />
                <button className="absolute top-4 right-4 text-2xl text-red-500">{<AiFillHeart />}</button>  {/* Favorite toggle */}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
                <p className="text-gray-600 mb-3">{p.location} • {p.type}</p>
                <p className="text-2xl font-bold text-indigo-600">${p.price}</p>
                <Link to={`/property/${p.id}`} className="btn-primary mt-4 block text-center">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}