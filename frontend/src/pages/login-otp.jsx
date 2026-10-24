import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { json, z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import config from '../config';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../App';
const LoginOtp = () => {
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const schema = z.object({
        email: z.string().email('Invalid email'),
        otp: z.string().min(3, 'Minimum 3 characters'),
    });

    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm({
        resolver: zodResolver(schema)
    });

    const handleFormSubmit = async (loginData) => {
        try {
            const { data } = await axios.post(`${config.BACKEND_URL}/api/auth/signin-otp`, loginData)
            setUser(data.result)
            localStorage.setItem("user", JSON.stringify(data.result))
            reset()
            toast.success("login success")
            navigate("/admin")
        } catch (error) {
            toast.error('unable to login')
            console.log(error);
        }
    };

    const handleClasses = (key) => clsx({
        'form-control my-2': true,
        'is-invalid': errors[key],
        'is-valid': touchedFields[key] && !errors[key],
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card">
                        <div className="card-header">Login With OTP</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(handleFormSubmit)}>
                                <div>
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="text"
                                        {...register('email')}
                                        className={handleClasses('email')}
                                        id="email"
                                        placeholder="Enter Your Email"
                                    />
                                    <div className="invalid-feedback">{errors.email?.message}</div>
                                </div>

                                <div className="mt-2">
                                    <label htmlFor="otp" className="form-label">otp</label>
                                    <input
                                        type="otp"
                                        {...register('otp')}
                                        className={handleClasses('otp')}
                                        id="otp"
                                        placeholder="Enter Your otp"
                                    />
                                    <div className="invalid-feedback">{errors.otp?.message}</div>
                                </div>

                                <button type="submit" className="btn btn-primary w-100 mt-3">
                                    Login With OTP
                                </button>
                            </form>

                            <p className="text-center mt-3">
                                You will recive OTP on your email shortly
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginOtp;