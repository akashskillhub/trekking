import { useContext } from "react"
import { AuthContext } from "../App"
import { Navigate } from "react-router-dom"

const AdminProtected = ({ children }) => {
    const { user, setUser } = useContext(AuthContext)
    return user ? children : <Navigate to='/login' />
}

export default AdminProtected