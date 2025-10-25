import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProperty } from '../services/api';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProperty(id);
      setProperty(res.data);
    })();
  }, [id]);

  if (!property) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="card max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              <img
                src={`http://localhost:5000${property.images[0]}`}
                alt={property.title}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
              <div className="grid grid-cols-3 gap-2 mt-4">
                {property.images.slice(1, 4).map((img, i) => (
                  <img key={i} src={`http://localhost:5000${img}`} className="h-24 object-cover rounded-lg shadow" />
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="p-8">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{property.title}</h1>
              <p className="text-3xl font-bold text-indigo-600 mb-4">${property.price.toLocaleString()}</p>
              <p className="text-lg text-gray-600 mb-6 flex items-center">
                Location: {property.location}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">{property.description}</p>

              <div className="flex gap-4">
                <button className="btn-primary flex-1">Contact Agent</button>
                <button className="btn-success flex-1">Save Favorite</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}