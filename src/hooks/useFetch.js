
import  {useContext}  from "react"
import { AuthContext } from "../context/AuthContext"
// import dotenv from "dotenv"
// dotenv.config()

export function useFetch() {
const { logout } = useContext(AuthContext)
const apiFetch =  async (endpoint, options = {}) => {

    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_URL;

    const res = await fetch(`${API_URL}${endpoint}`, {... options,

    headers: {
        "Content-Type": 'application/json',
        ...(token && {Authorization: `Bearer ${token}`}),
        ...options.headers,
    }
})
if (res.status === 401) {
logout()
return
}
return res;
}
return {apiFetch} 
}
