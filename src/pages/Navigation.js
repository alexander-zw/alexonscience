import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/index.css';
import '../styles/Navigation.css';
import science_banner from '../images/science_banner.jpg';

const Navigation = () => {
    return (
       <div>
           <div>
               <img id="science-banner-image" src={science_banner} alt="ALEX on Science" />
           </div>
            <NavLink to="/" className="text-div">Home</NavLink>
            <NavLink to="/art" className="text-div">Art</NavLink>
       </div>
    );
}

export default Navigation;
