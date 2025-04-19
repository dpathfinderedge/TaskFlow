import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing, Register, Login, Dashboard, NotFound, PrivateRoute } from './components/pages';
import { useAuthContext } from './contexts/AuthContext';

const ProtectedRoute = ({children}) => {
  const { user } = useAuthContext();
  console.log(user);

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
