/**
 * Test for the Contact.js component.
 */
import React from "react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import Contact from "../components/Contact";

describe("Contact", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<Contact />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
