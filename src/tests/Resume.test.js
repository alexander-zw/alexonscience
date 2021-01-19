/**
 * Test for the Resume.js component.
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import Resume from '../components/Resume';

it('renders correctly', () => {
    // Resume has a Link, so we surround it with a router.
    const tree = renderer.create(<BrowserRouter><Resume /></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
});
