// src/App.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Login from './components/Login';
import Home from './components/Home';

const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return <>{isAuthenticated ? <Home /> : <Login />}</>;
};

export default App;
