import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("userid") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  // useEffect(() => {}, [user, token]);

  const _login = async ({ email, token }) => {
    try {
      const _user = await axios({
        method: "post",
        url: "http://localhost:3000/user",
        headers: {
          Authorization: `Bearer ${token}`,
          email: email,
        },
      });

      if (!user) {
        console.log("Nothing received back");
      }

      setUser(_user.data.user);
      setToken(token);
      localStorage.setItem("userid", _user.data.user.userId);
      localStorage.setItem("token", token);
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log("creds problem");
      }
      if (error.response && error.response.status === 400) {
        console.log(error.response);

        console.log("input problem");
      }
    }
  };

  const _logout = () => {
    setUser("");
    setToken("");
    localStorage.removeItem("userid");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const contextValue = {
    user,
    token,
    _login,
    _logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
