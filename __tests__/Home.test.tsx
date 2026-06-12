import { render, screen } from '@testing-library/react';
import Home from '../src/pages/Home/Home';
import { BrowserRouter } from 'react-router-dom';

describe('Home Page Testing', () => {
  // test_No 01: renders "welcome" text
  test('renders "welcome" text', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const text = screen.getByText('Welcome');
    expect(text).toBeInTheDocument();
  });

  // test_No 01: renders Buttons
  test('renders Buttons', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const Buttons = screen.getAllByRole('button');
    for (let Button of Buttons) {
      expect(Button).toBeInTheDocument();
    }
  });
});
