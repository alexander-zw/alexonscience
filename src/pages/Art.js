import React from 'react';
import '../styles/index.css';
import '../styles/Art.css';
import hello_there from '../images/hello_there.png';
import general_kenobi from '../images/general_kenobi.png';

const Art = () => {
    return (
        <div>
            <div id="kenobi-image">
                <img className="bottom" src={general_kenobi} alt="Hello there"/>
                <img className="top" src={hello_there} alt="General Kenobi"/>
            </div>
        </div>
    );
}

export default Art;
