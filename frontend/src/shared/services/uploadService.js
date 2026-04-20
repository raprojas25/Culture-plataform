import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    return response.data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error(error.response?.data?.message || 'Error al subir la imagen');
  }
};

export const validateImage = (file) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Solo se permiten imágenes JPG, PNG o WebP');
  }

  if (file.size > maxSize) {
    throw new Error('La imagen no debe superar los 5MB');
  }

  return true;
};
