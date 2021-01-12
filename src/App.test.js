import { render, screen } from '@testing-library/react';
import App from './App';

test('renders my name', () => {
    render(<App />);
    const linkElement = screen.getByText(/Alexander Wu/i);
    expect(linkElement).toBeInTheDocument();
});
