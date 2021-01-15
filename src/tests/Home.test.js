/**
 * Test for the Home.js component.
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Home from '../components/Home';

test('renders some text', () => {
    render(<Home />);
    const linkElement = screen.getByText(/YouTube channel/i);
    expect(linkElement).toBeInTheDocument();
});

it('renders correctly', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
});
