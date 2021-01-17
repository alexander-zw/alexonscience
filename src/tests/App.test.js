/**
 * This test checks the whole page, so it is able to test the navigation bar
 * (Navigation.js) and footer (Footer.js).
 */
import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import App from '../components/App';

it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
});
