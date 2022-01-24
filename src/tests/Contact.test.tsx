import "@testing-library/jest-dom";

import React from "react";
import renderer from "react-test-renderer";

import Contact from "../components/Contact";

/**
 * Test for the Contact.tsx component.
 */
describe("Contact", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<Contact />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
