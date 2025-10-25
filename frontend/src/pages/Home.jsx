import { useEffect, useState } from 'react';
import { getProperties } from '../services/api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({ location: '', type: '' });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await getProperties(filters);
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  // ← RETURN MUST BE INSIDE THE FUNCTION
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-20">
      <div className="container mx-auto p-8">
        {/* PROOF UI IS WORKING */}
        <div className="text-center py-20">
          <h1 className="text-6xl font-bold">UI IS WORKING!</h1>
          <p className="text-2xl mt-4 text-gray-600">You can now see colors</p>
          <button className="mt-8 btn-primary text-xl px-12 py-4">
            Click Me
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-12">
          <input
            placeholder="Enter location..."
            value={filters.location}
            onChange={e => setFilters({ ...filters, location: e.target.value })}
            className="input-field flex-1"
          />
          <input
            placeholder="Type (apartment, house...)"
            value={filters.type}
            onChange={e => setFilters({ ...filters, type: e.target.value })}
            className="input-field"
          />
          <button type="submit" className="btn-primary text-lg px-8">
            Search
          </button>
        </form>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((p) => (
            <div key={p.id} className="card group">
              <div className="relative overflow-hidden">
                <img
                  src={p.images?.[0] ? `http://localhost:5000${p.images[0]}` : '/placeholder.jpg'}
                  alt={p.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 text-indigo-600 font-bold px-3 py-1 rounded-full text-sm">
                  ${p.price.toLocaleString()}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{p.title}</h3>
                <p className="text-gray-600 mb-3 flex items-center">
                  Location: {p.location}
                </p>
                <p className="text-sm text-gray-500 mb-4">Type: {p.type}</p>
                <Link
                  to={`/property/${p.id}`}
                  className="inline-block btn-primary text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">No properties found.</p>
          </div>
        )}
      </div>
    </div>
  );
}