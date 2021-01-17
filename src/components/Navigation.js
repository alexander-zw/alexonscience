/**
 * The navigation bar component contains links to go to different components
 * of the page. Must be used inside of a BrowserRouter. Includes a top banner
 * image and pretty animations.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../styles/index.css';
import '../styles/Navigation.css';
import science_banner from '../images/science_banner.jpg';

function NavigationOption(props) {
    return (
        <div className="nav-option-div">
            <NavLink
                to={props.to}
                exact={props.exact ? props.exact : undefined}
                className="nav-option"
                activeClassName="active-nav-option"
            >
                {props.children}
            </NavLink>
        </div>
    );
}

NavigationOption.propTypes = {
    to: PropTypes.string,
    exact: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),
};

function Navigation() {
    return (
        <div>
            <div>
                <img id="science-banner-image" src={science_banner} alt="ALEX on Science" />
            </div>
            <div className="text-div">
                <NavigationOption to="/" exact>Home</NavigationOption>
                <NavigationOption to="/youtube">YouTube</NavigationOption>
                <NavigationOption to="/portfolio">Portfolio</NavigationOption>
                <NavigationOption to="/art">Art</NavigationOption>
                <NavigationOption to="/contact">Contact Me</NavigationOption>
            </div>
        </div>
    );
}

export default Navigation;
