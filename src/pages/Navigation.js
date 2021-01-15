import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/index.css';
import '../styles/Navigation.css';
import science_banner from '../images/science_banner.jpg';

const NavigationOption = (props) => {
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

const Navigation = () => {
    return (
        <div>
            <div>
               <img id="science-banner-image" src={science_banner} alt="ALEX on Science" />
            </div>
            <div className="text-div">
                <NavigationOption to="/" exact>Home</NavigationOption>
                <NavigationOption to="/youtube">YouTube</NavigationOption>
                <NavigationOption to="/art">Art</NavigationOption>
            </div>
        </div>
    );
}

export default Navigation;
