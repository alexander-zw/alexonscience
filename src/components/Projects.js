/**
 * This component contains links to my projects.
 */
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import Konva from "konva";
import { Stage, Layer, Rect, Text } from "react-konva";
import Slider from "@material-ui/core/Slider";
import "../styles/index.css";

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
            shadowBlur={5}
            onClick={handleClick}
        />
    );
}

ColoredRect.propTypes = {
    x: PropTypes.number,
};

function Projects() {
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
        <div>
            <Helmet>
                <title>Projects | ALEX on Science</title>
                <meta name="Description" content="Alex's projects" />
                <meta name="KeyWords" content="project, alex, alexander, wu, science, youtube" />
            </Helmet>

            <div className="text-div top-margin bottom-margin">
                <div style={{ width: "300px" }}>
                    <br />
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
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        <Text text="Try sliding the slider and clicking on the square." />
                        <ColoredRect x={x} />
                    </Layer>
                </Stage>
            </div>
        </div>
    );
}

export default Projects;
