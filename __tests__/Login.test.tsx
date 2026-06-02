import { vi } from 'vitest';
import fetchLoginDetails from '../src/services/loginApi'
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../src/pages/Login/Login';
import { BrowserRouter } from 'react-router-dom';

describe('Login Page', ()=>{

    // test_No 01: required fields are testing
    test('required fields are testing', async()=>{
      render(
        <BrowserRouter>
        <Login/>
        </BrowserRouter>
       )
     const LoginButton = screen.getByText('Login')
      fireEvent.click(LoginButton)
        const text = await screen.findByText('Email and Password fields are required')
        expect(text).toBeInTheDocument()
    })

    // test_No 02: renders error component on server error
  test('renders error component on server error', async () => {
    globalThis.fetch = vi.fn().mockRejectedValueOnce(
      new Error('Server Error')
    );

    render(<Login />);

   const emailInput = document.getElementById('email')
    fireEvent.change(emailInput as HTMLInputElement, {
      target: { value: 'abc@gmail.com' },
    });
    const passwordInput = document.getElementById('password')
    fireEvent.change(passwordInput as HTMLInputElement, {
      target: { value: '123' },
    });

    const loginButton = screen.getByText('Login')
    fireEvent.click(loginButton);
    const errorElement = await screen.findByTestId("error-component")
    expect(errorElement).toBeInTheDocument();
  });
   
  // test_No 03: successful login api call
   test('successful login api call', async () => {
    globalThis.fetch = vi.fn();
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValue({
        token: 'abc123',
        message: 'Login Success',
      }),
    });
    const data = await fetchLoginDetails(
      'shivu@gmail.com',
      'pass123'
    );
    expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'shivu@gmail.com',
          password: 'pass123',
        }),
      }
    );
    expect(data.token).toBe('abc123');
    expect(data.message).toBe('Login Success');
  });
})