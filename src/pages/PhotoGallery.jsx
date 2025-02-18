import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';


const photos = [
  'https://bdrcs.org/wp-content/uploads/2024/09/Cox-Chairman-1-510x340.jpg',
  'https://bdrcs.org/wp-content/uploads/2020/11/IMG_1104-604x400.jpg',
  'https://bdrcs.org/wp-content/uploads/2024/05/Coxs-Bazar-11-2-510x383.jpg',
  'https://bdrcs.org/wp-content/uploads/2020/11/IMG_1071-600x400.jpg',
  'https://bdrcs.org/wp-content/uploads/2020/11/PMO_3-533x400.jpeg',
  'https://bdrcs.org/wp-content/uploads/2024/06/02-1-510x383.jpeg',
];

const PhotoGallery = () => {
  const { dark } = useContext(AuthContext);

  return (
    <div className={dark ? ' text-white' : 'bg-white text-gray-900'}>
      <h2 className="text-3xl font-bold text-center py-6">Photo Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {photos.map((photo, index) => (
          <div key={index} className="card shadow-xl hover:scale-105 transition-transform">
            <figure>
              <img src={photo} alt={`Gallery ${index}`} className="w-full h-64 object-cover rounded-xl" />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
