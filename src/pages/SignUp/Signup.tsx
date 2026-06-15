/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import './Signup.css';
import Button from '../../components/Buttons/Button';
import validateSignup from '../../components/validations/validations';
import withLoader from '../../hoc/withLoader';
import withErrorHandling from '../../hoc/withErrorHandling';
import CreateUser from '../../services/signUpApi';
import { useNavigate } from 'react-router-dom';

interface SignupProps {
  userRegistration: () => void;
  message: string;
  signUpData: {
    user_name: string;
    email: string;
    role: string;
    password: string;
  };
  setSignUpData: (value: any) => void;
}

function Signup({
  userRegistration,
  message,
  signUpData,
  setSignUpData,
}: SignupProps) {
  const handleChangeEvent = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setSignUpData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <form className="signup-div">
        <h1 className="sign-up-heading">Sign Up</h1>
        <label htmlFor="user_name">Name*: </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          value={signUpData.user_name}
          onChange={handleChangeEvent}
        />
        <label htmlFor="user_email">Email*: </label>
        <input
          type="email"
          id="user_email"
          name="email"
          value={signUpData.email}
          onChange={handleChangeEvent}
        />
        <p>User Role</p>
        <div className="user-type">
          <input
            id="Customer"
            type="radio"
            name="role"
            value="Customer"
            checked={signUpData.role === 'Customer'}
            onChange={handleChangeEvent}
          />
          <label htmlFor="Customer">Custome</label>
          <input
            id="Seller"
            type="radio"
            name="role"
            value="Seller"
            checked={signUpData.role === 'Seller'}
            onChange={handleChangeEvent}
          />
          <label htmlFor="Seller">Seller</label>
        </div>
        <label htmlFor="user_password">password*: </label>
        <input
          type="text"
          id="user_password"
          name="password"
          value={signUpData.password}
          onChange={handleChangeEvent}
        />
        <Button text="Sign Up" onClick={userRegistration}></Button>
        <p className="error">{message}</p>
      </form>
    </div>
  );
}

const EnhancedSignup = withLoader(withErrorHandling(Signup));

function SignupContainer() {
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    user_name: '',
    email: '',
    role: '',
    password: '',
  });
  const [message, setMessage] = useState<string>('');
  const [serverError, setServerError] = useState<any>(false);
  const [loading, setLoading] = useState(false);

  const userRegistration = async (event: React.SyntheticEvent<HTMLElement>) => {
    try {
      event.preventDefault();
      setLoading(true);
      const error = validateSignup(signUpData);
      console.log(error);
      if (error) {
        setMessage(error);
        return;
      }
      const data = await CreateUser(signUpData);
      alert(data.message);
      navigate('/');
    } catch (error) {
      setServerError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EnhancedSignup
      loading={loading}
      serverError={serverError}
      userRegistration={userRegistration}
      message={message}
      signUpData={signUpData}
      setSignUpData={setSignUpData}
    />
  );
}

export default SignupContainer;
