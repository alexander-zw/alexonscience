/**
 * Test for the Art.js component.
 */
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import Art from '../components/Art';

it('renders correctly', () => {
    const tree = renderer.create(<Art />).toJSON();
    expect(tree).toMatchSnapshot();
});
