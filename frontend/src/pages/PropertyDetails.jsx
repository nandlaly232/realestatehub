import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProperty } from '../services/api';
import { AiOutlineMessage } from 'react-icons/ai';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getProperty(id).then(res => setProperty(res.data));
  }, [id]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className="min-h-screen pt-20 p-8">
      <div className="card max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Carousel */}
        <div>
          <img src={`http://localhost:5000${property.images[currentImage]}`} alt="" className="w-full h-96 object-cover rounded-xl" />
          <div className="flex gap-2 mt-4">
            {property.images.map((img, i) => (
              <img key={i} src={`http://localhost:5000${img}`} onClick={() => setCurrentImage(i)} className="h-20 object-cover rounded cursor-pointer" />
            ))}
          </div>
        </div>
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
          <p className="text-3xl text-indigo-600 mb-4">${property.price}</p>
          <p className="text-gray-600 mb-6">{property.description}</p>
          <div className="flex gap-4">
            <button className="btn-primary flex-1">Contact</button>
            <button className="btn-success flex-1 flex items-center justify-center"><AiOutlineMessage /> Message</button>
          </div>
          <input type="text" placeholder="Send message..." value={message} onChange={e => setMessage(e.target.value)} className="input-field mt-4" />
        </div>
      </div>
    </div>
  );
}