import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
// import { auth } from "@/lib/firebase";
import  auth  from "@/lib/fireBase.Config";

// Define Auth State Type
type AuthState = {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signInUser: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Load user from Local Storage (Instant Authentication)
const loadUser = (): User | null => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

// Zustand Store (Without `onAuthStateChanged`)
const useAuthStore = create<AuthState>((set) => ({
  user: loadUser(), // Load user instantly
  loading: false,

  // Sign Up
  signUp: async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    localStorage.setItem("user", JSON.stringify(user)); // Save user in Local Storage
    set({ user });
  },

  // Sign In
  signInUser: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    localStorage.setItem("user", JSON.stringify(user)); // Save user in Local Storage
    set({ user });
  },

  // Logout
  logout: async () => {
    await signOut(auth);
    localStorage.removeItem("user"); // Remove user from Local Storage
    set({ user: null });
  },
}));

export default useAuthStore;
