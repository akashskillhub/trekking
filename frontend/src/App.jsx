import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import AdminNavbar from "./components/admin-navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import "react-toastify/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { createContext } from "react";
import { useState } from "react";
import AdminProtected from "./components/admin-protected";

export const AuthContext = createContext()

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  return (
    <AuthContext value={{ user, setUser }}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<> <Navbar /> <Outlet /> </>}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/admin" element={<AdminProtected> <AdminNavbar /> <Outlet /> </AdminProtected>}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
