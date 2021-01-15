/**
 * Test for the Error.js component, which is essentially the 404 page.
 */
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import Error from '../components/Error';

it('renders correctly', () => {
    const tree = renderer.create(<Error />).toJSON();
    expect(tree).toMatchSnapshot();
});
