import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { IUser } from "../assets/assets";
import { apiConnector } from "../configs/apiConnector";
import { Auth_Api } from "../services/apis";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/* ================= TYPES ================= */

interface AuthContextProps {
  isLoggedIn: boolean;
  user: IUser | null;
  login: (user: { email: string; password: string }) => Promise<void>;
  signup: (user: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  updateIsLogin: (val: boolean) => void;
}

/* ================= CONTEXT ================= */

const AuthContext = createContext<AuthContextProps | null>(null);

/* ================= PROVIDER ================= */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  /* ---------- SIGNUP ---------- */
  const signup = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    console.log("I am in AuthContext signup");
    try {
      const { data } = await apiConnector("POST", Auth_Api.SIGNUP, {
        name,
        email,
        password,
      });
      console.log("data in signUP:", data);
      if (data.user) {
        setUser(data.user);
        setIsLoggedIn(true);
        localStorage.setItem("token", data.user.token);
      }

      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.message || "Signup failed");
    }
  };

  /* ---------- LOGIN ---------- */
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.log("I am in authcontext login");
    try {
      const { data } = await apiConnector("POST", Auth_Api.LOGIN, {
        email,
        password,
      });
      console.log("login data: ", data);

      if (data.user) {
        setUser(data.user);
        setIsLoggedIn(true);
        localStorage.setItem("token", data.user.token);
      }

      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    }
  };

  /* ---------- LOGOUT ---------- */
  const logout = async () => {
    console.log("I am in auth context logout");
    try {
      await apiConnector("POST", "/api/auth/logout");

      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      navigate("/");

      toast.success("Logged out successfully");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message || "Logout failed");
    }
  };

  /* ---------- VERIFY USER ---------- */
  const fetchUser = async () => {
    try {
      const { data } = await apiConnector("GET", Auth_Api.VERIFY);

      if (data.user) {
        setUser(data.user);
        setIsLoggedIn(true);
      }
    } catch {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const updateIsLogin = (val: boolean) => setIsLoggedIn(val);

  const value: AuthContextProps = {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
    updateIsLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/* ================= HOOK ================= */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

// import React, { createContext, useContext, useEffect, useState } from "react";
// import type { IUser } from "../assets/assets";
// import { apiConnector } from "../configs/apiConnector";
// import { Auth_Api } from "../services/apis";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext<AuthContextProps>({
//   isLoggedIn: false,
//   setIsLoggedIn: () => {},
//   user: null,
//   setUser: () => {},
//   login: async () => {},
//   signup: async () => {},
//   logout: async () => {},
//   updateIsLogin:(val: boolean) => void,
// });

// interface AuthContextProps {
//   isLoggedIn: boolean;
//   setIsLoggedIn: (isLoggedIn: boolean) => void;
//   user: IUser | null;
//   setUser: (user: IUser | null) => void;
//   login: (user: { email: string; password: string }) => Promise<void>;
//   signup: (user: {
//     name: string;
//     email: string;
//     password: string;
//   }) => Promise<void>;
//   logout: () => Promise<void>;
//   updateIsLogin:()=>{}
// }

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<IUser | null>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const signup = async ({
//     name,
//     email,
//     password,
//   }: {
//     name: string;
//     email: string;
//     password: string;
//   }) => {
//     try {
//       const { data } = await apiConnector("POST", Auth_Api.SIGNUP, {
//         name,
//         email,
//         password,
//       });
//       if (data.user) {
//         setUser(data.user as IUser);
//         setIsLoggedIn(true);
//       }
//       toast.success(data.message);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const login = async ({
//     email,
//     password,
//   }: {
//     email: string;
//     password: string;
//   }) => {
//     try {
//       const { data } = await apiConnector("POST", Auth_Api.LOGIN, {
//         email,
//         password,
//       });

//       console.log("Data : ", data);
//       if (data.user) {
//         setUser(data.user as IUser);
//         setIsLoggedIn(true);
//       }
//       localStorage.setItem("token", data?.user?.token);
//       toast.success(data.message);
//     } catch (error: any) {
//       console.log("Error in logging : ", error.message);
//     }
//   };
//   const updateIsLogin = (val: boolean) => setIsLoggedIn(val);

//   const logout = async () => {
//     try {
//       const { data } = await axios.post(
//         "http://localhost:4001/api/auth/logout",
//       );
//       // const { data } = await apiConnector("POST", Auth_Api.LOGOUT);
//       setUser(null);
//       setIsLoggedIn(false);
//       navigate("/");
//       toast.success(data.message);
//     } catch (error: any) {
//       console.log("Error in logout: ", error.message);
//     }
//   };
//   const fetchUser = async () => {
//     try {
//       const { data } = await apiConnector("GET", Auth_Api.VERIFY);
//       console.log("data:", data);
//       if (data.user) {
//         console.log("data user :", data.user);
//         setUser(data.user as IUser);
//         setIsLoggedIn(true);
//       }

//       toast.success(data.message);
//     } catch (error: any) {
//       console.log("Error in fetch user :", error.message);
//       toast.error(error.message || "Something went wrong");
//     }
//   };
//   useEffect(() => {
//     (async () => {
//       await fetchUser();
//     })();
//   }, []);
//   const value = {
//     user,
//     setUser,
//     isLoggedIn,
//     setIsLoggedIn,
//     signup,
//     logout,
//     login,
//     updateIsLogin,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);
