import { useAuth } from "@/lib/authContext";
import { Navigate } from "react-router-dom";

export function RequireRole({ role, children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user || user.role !== role) return <Navigate to="/auth" replace />;
  return children;
}
