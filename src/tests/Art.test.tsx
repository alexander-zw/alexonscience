import "@testing-library/jest-dom";

import React from "react";
import renderer from "react-test-renderer";

import Art from "../components/Art";

/**
 * Test for the Art.tsx component.
 */
describe("Art", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<Art />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
