// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";
// import { useAuth } from "../contexts/AuthContext";
// const {updateIsLogin} = useContext()
import { useAuth } from "../contexts/AuthContext";
interface JwtPayload {
  exp: number;
  id?: string;
  name?: string;
}

interface IsLoginProps {
  children: ReactNode;
}

const IsLogin = ({ children }: IsLoginProps) => {
  const token = localStorage.getItem("token");

  const { updateIsLogin } = useAuth();

  if (!token) {
    // console.log("inside not token aviailanle");
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    // console.log("Decoded:", decoded);

    // exp is in seconds → convert to ms
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }

    updateIsLogin(true);
    return <>{children}</>;
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
};

export default IsLogin;
