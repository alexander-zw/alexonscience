import "@testing-library/jest-dom";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import Resume from "../components/Resume";

/**
 * Test for the Resume.tsx component.
 */
describe("Resume", () => {
    test("renders correctly", () => {
        // Resume has a Link, so we surround it with a router.
        const tree = renderer
            .create(
                <BrowserRouter>
                    <Resume />
                </BrowserRouter>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
