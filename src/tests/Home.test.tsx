import "@testing-library/jest-dom";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import { render, screen } from "@testing-library/react";

import Home from "../components/Home";

/**
 * Test for the Home.tsx component.
 */
describe("Home", () => {
    test("renders my name", () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>,
        );
        const linkElement = screen.getByText(/Alexander Wu/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("renders correctly", () => {
        const tree = renderer
            .create(
                <BrowserRouter>
                    <Home />
                </BrowserRouter>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
