import { GoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { toast } from "react-toastify"
import config from "../config"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../App"

const LoginGoogle = () => {
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleSuccess = async googleData => {
        try {
            const { data } = await axios.post(`${config.BACKEND_URL}/api/auth/signin-google`, googleData, { withCredentials: "includes" })
            console.log(data)
            setUser(data.result)
            localStorage.setItem("user", JSON.stringify(data.result))
            toast.success("login success")
            if (data.result.role === "admin") {
                navigate("/admin")
            } else {
                navigate("/user")
            }
        } catch (error) {
            console.log(error)
            toast.error("unable to signin")
        }
    }

    const handleError = err => {
        console.log(err)
    }

    return <>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </>
}

export default LoginGoogle