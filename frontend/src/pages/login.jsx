import { useState } from "react"
import LoginEmailPass from "./login-email-pass"
import LoginOtp from "./login-otp"
import LoginGoogle from "./login-google"

const Login = () => {
  const [authScreen, setAuthScreen] = useState(<LoginEmailPass />)
  return <>
    <button onClick={() => setAuthScreen(<LoginEmailPass />)} type="button" class="btn btn-outline-primary">Login with Email And password</button>
    <button onClick={() => setAuthScreen(<LoginOtp />)} type="button" class="btn btn-outline-primary">Login with OTP</button>
    <button onClick={() => setAuthScreen(<LoginGoogle />)} type="button" class="btn btn-outline-primary">Login with GOOGLE</button>

    {authScreen}
  </>
}

export default Login