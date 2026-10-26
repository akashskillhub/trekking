import { GoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { toast } from "react-toastify"
import config from "../config"

const LoginGoogle = () => {

    const handleSuccess = async googleData => {
        try {
            const { data } = await axios.post(`${config.BACKEND_URL}/api/auth/signin-google`, googleData)
            console.log(data)
            toast.success("login success")
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