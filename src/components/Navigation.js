/**
 * The navigation bar component contains links to go to different components
 * of the page. Must be used inside of a BrowserRouter. Includes a top banner
 * image and pretty animations.
 */
import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import { navigationViews } from "./subcomponents/AllViews";
import "../styles/index.css";
import "../styles/Navigation.css";

function NavigationOption(props) {
    return (
        <div className="nav-option-div">
            <NavLink
                to={props.to}
                exact={props.exact ? props.exact : undefined}
                className="nav-option"
                activeClassName="active-nav-option"
                onUpdate={() => window.scrollTo(0, 0)}
            >
                {props.children}
            </NavLink>
        </div>
    );
}

NavigationOption.propTypes = {
    to: PropTypes.string,
    exact: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

function Navigation() {
    const navigationOptions = Array.from(navigationViews, ([path, option]) => (
        <NavigationOption to={path} exact={option.exact} key={path}>
            {option.name}
        </NavigationOption>
    ));

    return <div className="nav-bar text-div">{navigationOptions}</div>;
}

export default Navigation;
