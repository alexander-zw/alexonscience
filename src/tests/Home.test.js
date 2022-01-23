/**
 * Test for the Home.js component.
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Home from "../components/Home";

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
