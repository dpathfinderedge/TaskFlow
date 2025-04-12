import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useAuthContext();
  if (loading) return null; // or a spinner

  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props}/> : <Navigate to="/login" />
      }
    />
  );
}

export default PrivateRoute;
