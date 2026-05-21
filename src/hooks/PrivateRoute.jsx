import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

function PrivateRoute({ children, role }) {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Utilisateur");
      logout();
      <Navigate to="/login" replace />;
    } [isLoggedIn, logout]

  })
  // if (!isLoggedIn) {
  //   console.log("Utilisateur");
  //   logout();
  //   return <Navigate to="/login" replace/>;
  // }
  if (role) {
    const { role: userRole } = jwtDecode(token);
    if (userRole !== role) {
      console.log("Vous n'avez pas le role nécessaire");
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default PrivateRoute;
