import { useEffect, useState } from 'react';
import { getProperties } from '../services/api';  // Filter by user in backend if needed

export default function Dashboard() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch user's properties (assume API filters by token)
    getProperties().then(res => setProperties(res.data));
  }, []);

  return (
    <div className="min-h-screen pt-20 p-8">
      <h1 className="text-4xl font-bold mb-8">Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((p) => (
          <div key={p.id} className="card">
            <img src={p.images?.[0]} alt={p.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3>{p.title}</h3>
              <button className="btn-danger mr-2">Edit</button>
              <button className="btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}