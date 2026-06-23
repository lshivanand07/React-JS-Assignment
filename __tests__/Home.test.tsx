/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from '@testing-library/react';
import HomeContainer from '../src/pages/Home/Home';
import { vi } from 'vitest';

vi.mock('../src/services/ProductApi', () => ({
  fetchProductDetails: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
  useSelector: (selector: any) =>
    selector({
      product: {
        productItem: [
          {
            product_id: 1,
            product_name: 'iPhone',
            description: 'Mobile',
            discount_percentage: 10,
            image_url: 'test.jpg',
          },
        ],
      },
    }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ state: {} }),
  };
});

test('renders products after fetching', async () => {
  render(<HomeContainer />);

  await waitFor(() => {
    expect(screen.getByText('iPhone')).toBeInTheDocument();
  });
});
