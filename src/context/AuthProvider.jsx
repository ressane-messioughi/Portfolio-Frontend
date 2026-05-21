import { useState } from "react"
import { AuthContext } from "./AuthContext"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"


export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('token')
  )


  const [user, setUser] = useState(null)

  function userInfo() {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch {
      setUser(null);
    }
  }
  function loginAuth(token) {
    localStorage.setItem("token", token)
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsLoggedIn(true);
    } catch {
      setUser(null);
      setIsLoggedIn(false);
    }
  }

const navigate = useNavigate();

  function logout() {

    localStorage.removeItem('token')
    setUser(null)
    setIsLoggedIn(false)
    navigate("/")
  }


  return (
    <AuthContext.Provider value=
      {{
        isLoggedIn,
        loginAuth,
        logout,
        user,
        userInfo


      }}>
      {children}
    </AuthContext.Provider>
  )

}



