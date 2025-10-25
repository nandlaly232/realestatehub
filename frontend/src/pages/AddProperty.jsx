import { useState } from 'react';
import { createProperty } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AddProperty() {
  const [form, setForm] = useState({ title: '', description: '', location: '', price: '', type: '' });
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProperty(form, images);
      navigate('/');
    } catch (err) {
      alert('Failed to add property');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="card p-8">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
            List Your Property
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="title"
              placeholder="Property Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-field"
              required
            />
            <textarea
              name="description"
              placeholder="Full checked..."
              rows="4"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input-field"
            />
            <input
              name="location"
              placeholder="Location (City, Area)"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="input-field"
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price in USD"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="input-field"
              required
            />
            <input
              name="type"
              placeholder="Type (Apartment, House, Condo)"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="input-field"
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages(Array.from(e.target.files))}
                className="input-field"
              />
            </div>

            <button type="submit" className="w-full btn-primary text-lg py-3">
              Publish Property
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}