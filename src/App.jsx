import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

const App = () => {
  return (
    <Provider store={store}>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center my-8">Posts</h1>
        <PostList />
        <br></br>
        <PostForm />
        
      </div>
    </Provider>
  );
};

export default App;
