import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningup: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: true,
  signup: async (credentials) => {
    try {
      set({ isSigningup: true });
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningup: false });
      toast.success("Signup successful");
    } catch (error) {
      toast.error(error.response.data.message || "Signup Failed");
      set({ isSigningup: false, user:null });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn : true});
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response.data.message || "Login Failed");
      set({ isLoggingIn : false, user:null })
    }
  },
  logout: async () => {
    set({isLoggingOut : true});
    try {
        await axios.post("/api/v1/auth/logout");
        set({ user: null, isLoggingOut: false});
        toast.success("Logout successful");
    } catch (error) {
        set({isLoggingOut: false});
        toast.error(error.response.data.message || "Logout failed")
    }
  },
  authCheck: async () => {
    set({isCheckingAuth: true});
    try {
        const response = await axios.get("/api/v1/auth/authCheck");
        set({ user: response.data.user, isCheckingAuth: false});
    } catch (error) {
        set({isCheckingAuth: false});
    }
  },
}));
