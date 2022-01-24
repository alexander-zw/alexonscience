import "../styles/index.css";
import "../styles/Navigation.css";

import React from "react";
import { NavLink } from "react-router-dom";

import { navigationViews } from "./subcomponents/AllViews";

/**
 * The navigation bar component contains links to go to different components
 * of the page. Must be used inside of a BrowserRouter. Includes a top banner
 * image and pretty animations.
 */
interface NavigationOptionProps {
    to: string;
    exact: boolean;
    children?: string | React.ReactElement;
}

function NavigationOption(props: NavigationOptionProps) {
    return (
        <div className="nav-option-div">
            <NavLink
                to={props.to}
                exact={props.exact}
                className="nav-option"
                activeClassName="active-nav-option"
            >
                {props.children}
            </NavLink>
        </div>
    );
}

function Navigation() {
    const navigationOptions = Array.from(navigationViews, ([path, option]) => (
        <NavigationOption to={path} exact={option.exact} key={path}>
            {option.name}
        </NavigationOption>
    ));

    return <div className="nav-bar text-div">{navigationOptions}</div>;
}

export default Navigation;
