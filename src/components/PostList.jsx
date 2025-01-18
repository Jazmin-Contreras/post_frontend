import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts, removePost } from '../redux/features/postSlice';

const PostList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const dispatch = useDispatch();
  const { items: posts, status, error } = useSelector((state) => state.posts);
  const [fetchError, setFetchError] = useState(null);
  const filteredPosts = posts.filter(post =>
    post.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const loadPosts = async () => {
      try {
        await dispatch(fetchAllPosts()).unwrap();
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message || 'Error al cargar los posts');
        console.error('Error loading posts:', err);
      }
    };
    
    loadPosts();
  }, [dispatch]);

  const handleDelete = async (nombre) => {
    try {
      await dispatch(removePost(nombre)).unwrap();
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Error al eliminar el post');
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="text-xl">Cargando posts</div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="p-4 text-red-500 border border-red-500 rounded">
        <h3 className="font-bold">Error de conexión:</h3>
        <p>{fetchError}</p>
        <p className="mt-2">Backend debe correr en http://localhost:5000</p>
      </div>
    );
  }
  return (
    <div className="mt-8">
    
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredPosts && filteredPosts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Nombre</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Descripción</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.nombre} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">{post.nombre}</td>
                  <td className="py-3 px-4 text-gray-600">{post.descripcion}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(post.nombre)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 p-4">
          No hay posts disponibles
        </div>
      )}
    </div>
  );

};

export default PostList;