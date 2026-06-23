import { render, screen } from '@testing-library/react';
import Navbar from '../src/components/Navbar/Navbar';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

describe('navbar buttons', () => {
  test('cart button navigates to cart page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/cart" element={<h1>My Cart</h1>} />
        </Routes>
      </MemoryRouter>
    );

    const cartButton = screen.getByRole('button', {
      name: /cart/i,
    });

    await userEvent.click(cartButton);

    expect(screen.getByText('My Cart')).toBeInTheDocument();
  });
});
