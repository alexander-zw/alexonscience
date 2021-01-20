/**
 * Test for the Home.js component.
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Home from "../components/Home";

test("renders my name", () => {
    render(<Home />);
    const linkElement = screen.getByText(/Alexander Wu/i);
    expect(linkElement).toBeInTheDocument();
});

it("renders correctly", () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
});
