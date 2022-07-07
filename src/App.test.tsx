import { render, screen } from '@testing-library/react';
import App from './app';
import store from 'features/store';

test('renders learn react link', () => {
  render(<App store={store}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
