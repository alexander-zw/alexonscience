/**
 * Test for the Projects.js component.
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import Projects from "../components/Projects";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <BrowserRouter>
                <Projects />
            </BrowserRouter>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
