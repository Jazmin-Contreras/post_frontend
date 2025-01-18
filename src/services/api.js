const API_URL = 'http://localhost:5000/api/posts';

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al obtener los posts');
    }
    return response.json();
  } catch (error) {
    console.error('Error in fetchPosts:', error);
    throw error;
  }
};

export const createPost = async (post) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al crear el post');
    }
    return response.json();
  } catch (error) {
    console.error('Error in createPost:', error);
    throw error;
  }
};

export const deletePost = async (nombre) => {
  try {
    const response = await fetch(`${API_URL}/delete/${nombre}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al eliminar el post');
    }
    return response.json();
  } catch (error) {
    console.error('Error in deletePost:', error);
    throw error;
  }
};