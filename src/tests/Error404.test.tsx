import "@testing-library/jest-dom";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import Error404 from "../components/Error404";

/**
 * Test for the Error404.tsx component, which is essentially the 404 page.
 */
describe("Error404", () => {
    test("renders correctly", () => {
        // Error has a Link, so we surround it with a router.
        const tree = renderer
            .create(
                <BrowserRouter>
                    <Error404 />
                </BrowserRouter>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
