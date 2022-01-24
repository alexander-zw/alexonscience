import "@testing-library/jest-dom";

import React from "react";
import renderer from "react-test-renderer";

import App from "../components/App";

/**
 * This test checks the whole page, so it is able to test the navigation bar
 * (Navigation.tsx) and footer (Footer.tsx).
 */
describe("Home", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
