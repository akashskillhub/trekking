import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import axios from "axios"
import config from '../config';
const Register = () => {
  const schema = z.object({
    name: z.string().min(3),
    email: z.string().email('Invalid email'),
    password: z.string().min(3, 'Minimum 3 characters'),
  });

  const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm({
    resolver: zodResolver(schema)
  });

  const handleFormSubmit = async (loginData) => {
    try {
      await axios.post(`${config.BACKEND_URL}/api/auth/register`, loginData);
      reset();
    } catch (error) {
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
            <div className="card-header">Registeration Form</div>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div>
                  <label htmlFor="name" className="form-label">name</label>
                  <input
                    type="text"
                    {...register('name')}
                    className={handleClasses('name')}
                    id="name"
                    placeholder="Enter Your name"
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
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
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    {...register('password')}
                    className={handleClasses('password')}
                    id="password"
                    placeholder="Enter Your Password"
                  />
                  <div className="invalid-feedback">{errors.password?.message}</div>
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-3">
                  Login
                </button>
              </form>

              <p className="text-center mt-3">
                Don't have an account? <Link to="/register">Create Account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;