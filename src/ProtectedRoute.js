import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuthContext from "./hooks/useAuthContext";

export default function ProtectedRoute({ redirectTo, children }) {
  const { token } = useAuthContext();
  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayed(true); 
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!delayed) {
    return; 
  }

  return token ? children : <Navigate to={redirectTo} replace />;
};
