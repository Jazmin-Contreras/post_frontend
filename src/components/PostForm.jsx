import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/features/postSlice';

const PostForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost(formData));
    setFormData({ nombre: '', descripcion: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
      <div className="mb-4">
        <label className="block mb-2">Nombre:</label>
        <input
          type="text"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Descripción:</label>
        <textarea
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Crear Post
      </button>
    </form>
  );
};
export default PostForm;