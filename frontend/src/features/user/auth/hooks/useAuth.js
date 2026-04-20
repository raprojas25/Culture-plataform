import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/shared/stores/authStore";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

export const useAuth = () => {

  const { user, token, isAuthenticated, isLoading, login, logout, setLoading } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { user, token } = await authService.login({ email, password });
      login(user, token);
      toast.success("¡Bienvenido!");

      // Redirect to intended page or dashboarid
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.error || "Error al iniciar sesión");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData) => {
    try {
      setLoading(true);
      const user = await authService.register(userData);
      toast.success("¡Registro exitoso! Por favor inicia sesión.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error al registrar");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    logout();
    navigate("/login");
    toast.success("Sesión cerrada");
  };

  const checkAuth = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const user = await authService.getProfile();
      useAuthStore.getState().updateUser(user);
    } catch (error) {
      // If token is invalid, logout
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
    checkAuth,
  };
};
