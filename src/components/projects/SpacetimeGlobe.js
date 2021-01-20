/**
 * This component contains my resume.
 *
 * This page is for anyone who came to learn about me personally, including
 * who I am, my skills and interests, and some of my projects that can't be
 * accessed directly on my website.
 */
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import Konva from "konva";
import { Stage, Layer, Rect } from "react-konva";
import Slider from "@material-ui/core/Slider";

import "../../styles/index.css";
import "../../styles/projects/SpacetimeGlobe.css";

function ColoredRect(props) {
    const [color, setColor] = useState("green");

    function handleClick() {
        setColor(Konva.Util.getRandomColor());
    }

    return (
        <Rect
            x={props.x}
            y={20}
            width={50}
            height={50}
            fill={color}
            shadowBlur={2}
            onClick={handleClick}
        />
    );
}

ColoredRect.propTypes = {
    x: PropTypes.number,
};

function SpacetimeGlobe() {
    const [x, setX] = useState(100);

    const marks = [
        {
            value: -5,
            label: "-5",
        },
        {
            value: 0,
            label: "0",
        },
        {
            value: 5,
            label: "-5",
        },
    ];

    function onSlide(e, val) {
        setX(100 + val * 10);
    }

    return (
        <div className="outer-container top-margin bottom-margin">
            <Helmet>
                <title>Spacetime Globe | ALEX on Science</title>
                <meta name="Description" content="Alex's resume" />
                <meta
                    name="KeyWords"
                    content="spacetime, globe, minutephysics, physics, special relativity, lorenz transformation, alex, alexander, wu, science, youtube"
                />
            </Helmet>

            <div className="controls text-div">
                <div className="slider-div">
                    Reference frame shift
                    <Slider
                        defaultValue={0}
                        getAriaValueText={(val) => val}
                        aria-labelledby="discrete-slider"
                        step={1}
                        marks={marks}
                        min={-5}
                        max={5}
                        valueLabelDisplay="auto"
                        onChange={onSlide}
                    />
                </div>
            </div>

            <div className="text-div">
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        <ColoredRect x={x} />
                    </Layer>
                </Stage>
            </div>
        </div>
    );
}

export default SpacetimeGlobe;
