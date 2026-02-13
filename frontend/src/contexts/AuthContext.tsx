import React, { createContext, useContext, useEffect, useState } from "react";
import type { IUser } from "../assets/assets";
import { apiConnector } from "../configs/apiConnector";
import { Auth_Api } from "../services/apis";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  login: (user: { email: string; password: string }) => Promise<void>;
  signup: (user: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const signup = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await apiConnector("POST", Auth_Api.SIGNUP, {
        name,
        email,
        password,
      });
      if (data.user) {
        setUser(data.user as IUser);
        setIsLoggedIn(true);
      }
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await apiConnector("POST", Auth_Api.LOGIN, {
        email,
        password,
      });

      if (data.user) {
        setUser(data.user as IUser);
        setIsLoggedIn(true);
      }
      toast.success(data.message);
    } catch (error: any) {
      console.log("Error in logging : ", error.message);
    }
  };
  const logout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/auth/logout",
      );
      // const { data } = await apiConnector("POST", Auth_Api.LOGOUT);
      setUser(null);
      setIsLoggedIn(false);
      navigate("/");
      toast.success(data.message);
    } catch (error: any) {
      console.log("Error in logout: ", error.message);
    }
  };
  const fetchUser = async () => {
    try {
      const { data } = await apiConnector("GET", Auth_Api.VERIFY);
      console.log("data:", data);
      if (data.user) {
        console.log("data user :", data.user);
        setUser(data.user as IUser);
        setIsLoggedIn(true);
      }

      toast.success(data.message);
    } catch (error: any) {
      console.log("Error in fetch user :", error.message);
      toast.error(error.message || "Something went wrong");
    }
  };
  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, []);
  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    signup,
    logout,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
