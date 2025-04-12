import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing, Register, Login, Dashboard, NotFound, PrivateRoute } from './components/pages';
import { useAuthContext } from './contexts/AuthContext';

// import PrivateRoute from './components/PrivateRoute';

function App() {
  const { user } = useAuthContext();

  const ProtectedRoute = ({children}) => {
    if (!user) {
      return <Navigate to="/login" />
    }
    return children;
  };

  return (
    <div class="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/dashboard"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
          {/* <PrivateRoute path="/dashboard"  element={<Dashboard />} /> */}
          {/* <Route path="*" render={() => <Navigate to="/login" />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
