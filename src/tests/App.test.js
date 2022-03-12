import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Test', () => {
  render(<App />);
  const elm = screen.getByText(/Test/i);
  expect(elm).toBeInTheDocument();
});
