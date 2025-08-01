import React, { createContext, useState, useEffect } from "react";

// إنشاء السياق
export const AuthContext = createContext();

// مزود السياق
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");

  // تحديث الحالة من localStorage عند أول تحميل
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");

    setIsLoggedIn(!!token);
    setUserRole(role || "");
    setUserEmail(email || "");
  }, []);

  // تسجيل الدخول
  const login = (token, role, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);
    localStorage.setItem("userEmail", email);

    setIsLoggedIn(true);
    setUserRole(role);
    setUserEmail(email);
  };

  // تسجيل الخروج
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");

    setIsLoggedIn(false);
    setUserRole("");
    setUserEmail("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
