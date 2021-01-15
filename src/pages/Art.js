import React from 'react';
import '../styles/index.css';
import '../styles/Art.css';
import hello_there from '../images/hello_there.png';
import general_kenobi from '../images/general_kenobi.png';
import math_name from '../images/math_name.jpg';
import fancy_pants_sketch from '../images/fancy_pants_sketch.jpg';

const Art = () => {
    return (
        <div>
            <div className="text-div">
                <p>
                    Here is some random artwork I have drawn for fun. Enjoy!
                </p>
            </div>

            <div className="artwork-div">
                <div id="kenobi-image">
                    <img className="bottom artwork-image" src={general_kenobi} alt="Hello there"/>
                    <img className="top artwork-image" src={hello_there} alt="General Kenobi"/>
                </div>
            </div>

            <div className="artwork-div">
                <img className="artwork-image" src={math_name} alt="How to name a math concept"/>
            </div>

            <div className="artwork-div" id="fancy-pants-image">
                <img className="artwork-image" id="fancy-pants-image"
                src={fancy_pants_sketch} alt="Fancy pants sketch"/>
            </div>
        </div>
    );
}

export default Art;
