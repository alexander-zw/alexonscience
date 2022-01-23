/**
 * Test for the Art.js component.
 */
import React from "react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import Art from "../components/Art";

describe("Art", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<Art />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
