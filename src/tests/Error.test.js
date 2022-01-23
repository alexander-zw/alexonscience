/**
 * Test for the Error.js component, which is essentially the 404 page.
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import Error from "../components/Error";

describe("Error", () => {
    test("renders correctly", () => {
        // Error has a Link, so we surround it with a router.
        const tree = renderer
            .create(
                <BrowserRouter>
                    <Error />
                </BrowserRouter>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
