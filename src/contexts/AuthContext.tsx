
import { createContext, useContext, useState, ReactNode } from "react";
import { User, Patient, Doctor } from "../types";
import { mockPatients, mockDoctors } from "../data/mockData";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    role: "patient" | "doctor"
  ) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // This is a mock implementation that simulates API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Check if it's a patient
        let foundUser: User | undefined = mockPatients.find((p) => p.email === email);
        
        // If not a patient, check if it's a doctor
        if (!foundUser) {
          foundUser = mockDoctors.find((d) => d.email === email);
        }
        
        // Check for admin (hardcoded for now)
        if (!foundUser && email === "admin@medsync.com" && password === "admin123") {
          foundUser = {
            id: "admin1",
            name: "System Administrator",
            email: "admin@medsync.com",
            role: "admin"
          };
        }

        if (foundUser && password === "password" || (email === "admin@medsync.com" && password === "admin123")) {
          setUser(foundUser);
          localStorage.setItem("user", JSON.stringify(foundUser));
          toast({
            title: "Login successful",
            description: `Welcome back, ${foundUser.name}!`,
          });
          
          // Navigate based on user role
          resolve();
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
          reject(new Error("Invalid email or password"));
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: "patient" | "doctor"
  ) => {
    setIsLoading(true);
    // This is a mock implementation that simulates API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const existingPatient = mockPatients.find((p) => p.email === email);
        const existingDoctor = mockDoctors.find((d) => d.email === email);

        if (existingPatient || existingDoctor) {
          toast({
            title: "Registration failed",
            description: "Email already in use",
            variant: "destructive",
          });
          reject(new Error("Email already in use"));
        } else {
          // Create a new user object
          const newUser: User = {
            id: `${role[0]}${Date.now()}`, // Generate a mock ID
            name,
            email,
            role,
          };

          // In a real implementation, we would save this to a database
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
          
          toast({
            title: "Registration successful",
            description: `Welcome, ${name}!`,
          });
          resolve();
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
