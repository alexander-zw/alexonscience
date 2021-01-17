/**
 * Test for the Portfolio.js component.
 */
import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import Portfolio from '../components/Portfolio';

it('renders correctly', () => {
    const tree = renderer.create(<Portfolio />).toJSON();
    expect(tree).toMatchSnapshot();
});
