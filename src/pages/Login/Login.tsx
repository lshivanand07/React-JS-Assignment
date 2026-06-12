import React, { useState } from 'react';
import fetchLoginDetails from '../../services/loginApi';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import withErrorHandling from '../../hoc/withErrorHandling';
import withLoader from '../../hoc/withLoader';

interface LoginProps {
  loading: boolean;
  serverError: null;
  authenticated: boolean;
  errors: {
    email: string;
    password: string;
  };
  message: string;
  userLogin: () => void;
  loginData: {
    email: string;
    password: string;
  };
  setLoginData: (value: any) => void;
}

function Login({
  loading,
  serverError,
  authenticated,
  errors,
  message,
  userLogin,
  loginData,
  setLoginData,
}: LoginProps) {
  const handleChangeEvent = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setLoginData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    !loading &&
    !serverError &&
    !authenticated && (
      <form className="login-div">
        <h1>Login</h1>
        <label htmlFor="email">Email *: </label>
        <input
          type="text"
          id="email"
          name="email"
          value={loginData.email}
          placeholder="Enter Email"
          onChange={handleChangeEvent}
        />
        {errors.email && !errors.password && (
          <p className="error">{errors.email}</p>
        )}
        <label htmlFor="password">Password *: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginData.password}
          placeholder="Enter Password"
          onChange={handleChangeEvent}
        />
        {!errors.email && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <button onClick={userLogin} disabled={loading}>
          Login
        </button>
        {message && <p className="error">{message}</p>}
      </form>
    )
  );
}

const EnhancedLogin = withLoader(withErrorHandling(Login));

function LoginContainer() {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<any>({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [serverError, setServerError] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const userLogin = async (event: React.SyntheticEvent<HTMLElement>) => {
    try {
      event.preventDefault();
      setErrors({ email: '', password: '' });
      setMessage('');
      setLoading(true);
      setServerError(false);
      if (!loginData.email && !loginData.password) {
        setMessage('Email and Password Fields are required');
        return;
      }
      if (!loginData.email) {
        setErrors({ email: 'Email fields required', password: '' });
        return;
      }
      if (!loginData.password) {
        setErrors({ email: '', password: 'Password fields required' });
        return;
      }

      const data = await fetchLoginDetails(loginData);
      if (data.token) {
        setAuthenticated(true);
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setServerError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EnhancedLogin
      loading={loading}
      serverError={serverError}
      authenticated={authenticated}
      errors={errors}
      message={message}
      userLogin={userLogin}
      loginData={loginData}
      setLoginData={setLoginData}
    />
  );
}

export default LoginContainer;
