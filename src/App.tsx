// src/App.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Login from './components/Login';

const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return <>{isAuthenticated ? <Login /> : <Login />}</>;
};

export default App;
