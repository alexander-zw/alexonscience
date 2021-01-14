import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import MainPage from '../pages/MainPage';

test('renders my name', () => {
    render(<MainPage />);
    const linkElement = screen.getByText(/Alexander Wu/i);
    expect(linkElement).toBeInTheDocument();
});

it('renders correctly', () => {
    const tree = renderer.create(<MainPage />).toJSON();
    expect(tree).toMatchSnapshot();
});
