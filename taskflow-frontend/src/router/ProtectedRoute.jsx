import LoadingScreen from "@/components/LoadingScreen";
import { useAuthContext } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { user, loading } = useAuthContext();

    if (loading) {
      return <LoadingScreen />;
    }

    if (!user) {
      return <Navigate to="/login" replace />
    }
  
    return <Outlet />
}

export default ProtectedRoute;