import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/index.css';
import '../styles/Navigation.css';
import science_banner from '../images/science_banner.jpg';

const NavigationOption = (props) => {
    const [active, setActive] = useState(false);

    return (
        <NavLink
            to={props.to}
            exact={props.exact ? props.exact : undefined}
            className="nav-option-div"
            isActive={(match, location) => {
                // The conditional is necessary to prevent infinite loop.
                if (match) {
                    setActive(true);
                    return true;
                }
                setActive(false);
                return false;
            }}
        >
            <div
                className={`nav-option${active ? " active-nav-option" : ""}`}
            >
                {props.children}
            </div>
        </NavLink>
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
