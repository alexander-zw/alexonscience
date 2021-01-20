/**
 * The navigation bar component contains links to go to different components
 * of the page. Must be used inside of a BrowserRouter. Includes a top banner
 * image and pretty animations.
 */
import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import Home from "./Home";
import Resume from "./Resume";
import Art from "./Art";
import Contact from "./Contact";
import Projects from "./Projects";
import "../styles/index.css";
import "../styles/Navigation.css";

export const navigationViews = [
    {
        path: "/",
        title: "Home",
        component: Home,
        exact: true,
    },
    {
        path: "/youtube",
        title: "YouTube",
        component: () => {
            window.location.href = "https://www.youtube.com/channel/UCaV0jdBmPzgBk6AYweICoMA";
            return null;
        },
        exact: undefined,
    },
    {
        path: "/resume",
        title: "Resume",
        component: Resume,
        exact: undefined,
    },
    {
        path: "/projects",
        title: "Projects",
        component: Projects,
        exact: undefined,
    },
    {
        path: "/art",
        title: "Art",
        component: Art,
        exact: undefined,
    },
    {
        path: "/contact",
        title: "Contact Me",
        component: Contact,
        exact: undefined,
    },
];

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
    const navigationOptions = navigationViews.map((option, index) => (
        <NavigationOption to={option.path} exact={option.exact} key={index}>
            {option.title}
        </NavigationOption>
    ));

    return <div className="nav-bar text-div">{navigationOptions}</div>;
}

export default Navigation;
