import { vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import loginApi from '../src/services/loginApi'; // Direct import
import Login from '../src/pages/Login/Login';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../src/services/loginApi', () => ({
  default: vi.fn(),
}));

test('navigates to home page after customer login', async () => {
  mockNavigate.mockClear();

  vi.mocked(loginApi).mockResolvedValue({
    token: 'abc123',
    user_role: 'customer',
  });

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'abc@gmail.com' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: '123456' },
  });

  fireEvent.click(screen.getByText('Log in'));

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
