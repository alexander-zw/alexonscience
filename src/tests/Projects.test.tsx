import "@testing-library/jest-dom";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import Projects from "../components/Projects";

/**
 * Test for the Projects.tsx component.
 */
describe("Projects", () => {
    test("renders correctly", () => {
        const tree = renderer
            .create(
                <BrowserRouter>
                    <Projects />
                </BrowserRouter>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
