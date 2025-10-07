import React, { createContext, useState, useEffect, ReactNode } from "react";
import { login, signup, verifyOTP } from "../apiServices/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storage } from "../utils/storage";
interface User {
  id: string;
  phone?: string;
  email?: string;
  created_at?: number;
}
interface AuthResponse {
  status: string;
  message: string;
  data: any;
}
// Define context value type
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  loginAuth: (userData: any) => Promise<void>;
  signupAuth: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  setLoginState: (user: any, expiresIn: any) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  loginAuth: async () => {},
  signupAuth: async () => {},
  logout: async () => {},
  setLoginState: async () => {},
});

// Define props for provider
interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let logoutTimeout: ReturnType<typeof setTimeout>;
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        const results = await storage.multiGet(["user", "tokenExpiry"]);

        // results is array: [[key, value], [key, value]]
        const storedUser = results.find(([k]) => k === "user")?.[1];
        const storedExpiry = results.find(([k]) => k === "tokenExpiry")?.[1];

        if (storedUser && storedExpiry) {
          const expiryTime = parseInt(storedExpiry, 10); // seconds
          const currentTime = Math.floor(Date.now() / 1000);

          if (currentTime < expiryTime) {
            const remainingTime = expiryTime - currentTime;
            const parsedUser: User = JSON.parse(storedUser);

            setUser(parsedUser);
            setIsLoggedIn(true);
            scheduleAutoLogout(remainingTime);
          } else {
            await logout(); // token expired
          }
        }
      } catch (e) {
        console.log("Failed to load user:", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const loginData = {
    status: "success",
    message: "Login successful",
    data: {
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjhhNWI5ZGY3YjQ0NDYzMmU4Y2JkZWYxIiwidHlwZSI6ImFjY2VzcyIsImlzcyI6InRmYS1iYWNrZW5kIiwic3ViIjoiNjhhNWI5ZGY3YjQ0NDYzMmU4Y2JkZWYxIiwiZXhwIjoxNzU5MDU3ODcxLCJuYmYiOjE3NTg5NzE0NzEsImlhdCI6MTc1ODk3MTQ3MX0.Fx9YwP67JkvEWuLwNLaanPvNJhgw6RN8T5V6z6ajoAc",
      refresh_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjhhNWI5ZGY3YjQ0NDYzMmU4Y2JkZWYxIiwidHlwZSI6InJlZnJlc2giLCJpc3MiOiJ0ZmEtYmFja2VuZCIsInN1YiI6IjY4YTViOWRmN2I0NDQ2MzJlOGNiZGVmMSIsImV4cCI6MTc2NDE1NTQ3MSwibmJmIjoxNzU4OTcxNDcxLCJpYXQiOjE3NTg5NzE0NzF9.MkPP7zDHawsDgciwppKMDqBvqLdtMB8Uyh8A0g7_3YI",
      expires_in: 86400,
      user: {
        id: "68a5b9df7b444632e8cbdef1",
        phone: "",
        name: "New User",
        email: "s.ronit2812@gmail.com",
        interests: ["Startups", "Mutual Funds", "Economy"],
        created_at: 1755691487,
        onboarding_completed: true,
      },
      onboarding_required: false,
    },
  };
  const signupData = {
    status: "success",
    message: "User created successfully",
    data: {
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjhkN2JmYzlhMjFhYjc5YTNkNWRmZDA3IiwidHlwZSI6ImFjY2VzcyIsImlzcyI6InRmYS1iYWNrZW5kIiwic3ViIjoiNjhkN2JmYzlhMjFhYjc5YTNkNWRmZDA3IiwiZXhwIjoxNzU5MDU2MjAxLCJuYmYiOjE3NTg5Njk4MDEsImlhdCI6MTc1ODk2OTgwMX0.536ZzE27w6uKWxuKAxCgHmE_pqHWuHTXTq-6TDMyN0g",
      refresh_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjhkN2JmYzlhMjFhYjc5YTNkNWRmZDA3IiwidHlwZSI6InJlZnJlc2giLCJpc3MiOiJ0ZmEtYmFja2VuZCIsInN1YiI6IjY4ZDdiZmM5YTIxYWI3OWEzZDVkZmQwNyIsImV4cCI6MTc2NDE1MzgwMSwibmJmIjoxNzU4OTY5ODAxLCJpYXQiOjE3NTg5Njk4MDF9.m68KSSv_38H4PlQEHrLX-UDCpJtjfiTCX3RF5vCEEJc",
      expires_in: 86400,
      user: {
        id: "68d7bfc9a21ab79a3d5dfd07",
        phone: "",
        name: "Ragnar Lothbrok",
        email: "l.ragnar2807@gmail.com",
        created_at: 1758969801,
        onboarding_completed: false,
      },
      onboarding_required: true,
    },
  };
  // common function to handle login/signup response
  const handleAuthSuccess = async (responseData: any) => {
    try {
      const user = responseData.user;
      const accesstoken = responseData.access_token;
      const onboardingCompleted = responseData.user.onboarding_completed;
      const sessionExpiresIn = responseData.expires_in;

      const accessTokenExpiry =
        Math.floor(Date.now() / 1000) + sessionExpiresIn;

      const refreshTokenExpiry =
        Math.floor(Date.now() / 1000) + 60 * 24 * 60 * 60;

      await storage.multiSet([
        ["authToken", accesstoken ?? ""],
        ["status", responseData.status ?? ""],
        ["message", responseData.message ?? ""],
        ["user", JSON.stringify(user ?? {})],
        ["onboardingCompleted", String(onboardingCompleted ?? false)],
        ["tokenExpiry", accessTokenExpiry.toString()],
        ["refreshToken", responseData.refresh_token ?? ""],
        ["refreshTokenExpiry", refreshTokenExpiry.toString()],
      ]);

      setUser(user);
      setIsLoggedIn(true);
      scheduleAutoLogout(refreshTokenExpiry);
    } catch (err) {
      console.error("handleAuthSuccess failed:", err);
      throw err; // let loginAuth catch it
    }
  };

  const loginAuth = async (userData: any) => {
    setIsLoading(true);
    try {
      const response = await login(userData);
      const responseData = response.data as AuthResponse;
      console.log("Login Response=>", JSON.stringify(responseData, null, 2));
      if (responseData.status === "success") {
        await handleAuthSuccess(responseData.data);
      } else {
        throw new Error(responseData.message || "Login failed");
      }
    } catch (e) {
      //console.log("Login failed:", e);
      setIsLoggedIn(false);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const signupAuth = async (userData: any) => {
    setIsLoading(true);
    try {
      const response = await signup(userData);
      const responseData = response.data as AuthResponse;
      console.log("Signup Response=>", responseData);
      if (responseData.status === "success") {
        await handleAuthSuccess(responseData.data);
      } else {
        throw new Error(responseData.message || "Signup failed");
      }
    } catch (e) {
      // console.log("Signup failed:", e);
      setIsLoggedIn(false);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (logoutTimeout) clearTimeout(logoutTimeout);

      await storage.clear();

      setUser(null);
      setIsLoggedIn(false);
    } catch (e) {
      console.log("Logout failed:", e);
    } finally {
      setIsLoading(false);
    }
  };
  const setLoginState = async (userData: any, accessTokenExpiry: any) => {
    try {
      setUser(userData);
      setIsLoggedIn(true);
      await storage.setItem("user", JSON.stringify(userData));
      await storage.setItem("tokenExpiry", accessTokenExpiry.toString());
      //scheduleAutoLogout(86400); // optional auto-logout timer
    } catch (error) {
      console.log("Error setting login state manually:", error);
    }
  };

  const scheduleAutoLogout = (expiresInSeconds: number) => {
    if (logoutTimeout) clearTimeout(logoutTimeout);
    logoutTimeout = setTimeout(() => {
      logout();
    }, expiresInSeconds * 1000); // convert seconds to milliseconds
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        loginAuth,
        signupAuth,
        logout,
        setLoginState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
