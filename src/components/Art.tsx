import "../styles/index.css";
import "../styles/Art.css";

import React from "react";

import fancy_pants_sketch from "../images/art/fancy_pants_sketch.jpg";
import general_kenobi from "../images/art/general_kenobi.png";
import hello_there from "../images/art/hello_there.png";
import math_name from "../images/art/math_name.jpg";
import MetaTags from "./subcomponents/MetaTags";

/**
 * The art component contains includes a gallery of my artwork, which each
 * may or may not have some animation.
 */
function Art() {
    return (
        <div>
            <MetaTags path="/art" />

            <div className="text-div">
                <p>Here is some random artwork I have drawn for fun. Enjoy!</p>
            </div>

            <div className="artwork-div">
                <div id="kenobi-image">
                    <img className="bottom artwork-image" src={general_kenobi} alt="Hello there" />
                    <img className="top artwork-image" src={hello_there} alt="General Kenobi" />
                </div>
            </div>

            <div className="artwork-div">
                <img className="artwork-image" src={math_name} alt="How to name a math concept" />
            </div>

            <div className="artwork-div" id="fancy-pants-image">
                <img
                    className="artwork-image"
                    id="fancy-pants-image"
                    src={fancy_pants_sketch}
                    alt="Fancy pants sketch"
                />
            </div>
        </div>
    );
}

export default Art;
