/**
 * This component contains my resume.
 *
 * This page is for anyone who came to learn about me personally, including
 * who I am, my skills and interests, and some of my projects that can't be
 * accessed directly on my website.
 */
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { Stage, Layer, Rect } from "react-konva";
import Slider from "@material-ui/core/Slider";

import "../../styles/index.css";
import "../../styles/projects/SpacetimeGlobe.css";

function ColoredRect(props) {
    return <Rect x={props.x} y={props.y} width={0.5} height={0.5} fill="green" />;
}

ColoredRect.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
};

class SpacetimeEvent extends Component {
    constructor(props) {
        super(props);
        this.state = { t: props.t0, x: props.x0 };

        this.updateReferenceFrame = this.updateReferenceFrame.bind(this);
    }

    updateReferenceFrame(gamma, v) {
        this.setState({
            t: gamma * (this.props.t0 - v * this.props.x0),
            x: gamma * (this.props.x0 - v * this.props.t0),
        });
    }

    render() {
        const { x, t } = this.state;
        return <ColoredRect x={x} y={t} />;
    }
}

SpacetimeEvent.propTypes = {
    t0: PropTypes.number.isRequired,
    x0: PropTypes.number.isRequired,
};

function ReferenceFrameSlider(props) {
    const marks = [
        { value: -1, label: "-c" },
        { value: 0, label: "0" },
        { value: 1, label: "-c" },
    ];

    return (
        <div className="slider-div">
            Reference frame shift
            <Slider
                defaultValue={0}
                getAriaValueText={(val) => val}
                aria-labelledby="discrete-slider"
                step={0.1}
                marks={marks}
                min={-1}
                max={1}
                valueLabelDisplay="auto"
                valueLabelFormat={(val) => `${val}c`}
                onChange={props.onSlide}
            />
        </div>
    );
}

ReferenceFrameSlider.propTypes = {
    onSlide: PropTypes.func,
};

function SpacetimeGlobe() {
    const scale = 100;
    const canvasWidth = window.innerWidth * 0.7 - 100;
    const canvasHeight = window.innerHeight;
    const canvasOffsetX = (canvasWidth * 0.5) / scale;
    const canvasOffsetY = (canvasHeight * 0.5) / scale;

    const event = React.createRef();

    function onSlide(e, v) {
        if (v == 1 || v == -1) {
            v *= 0.999; // Prevent divide by zero.
        }
        const gamma = 1 / Math.sqrt(1 - v * v);
        event.current.updateReferenceFrame(gamma, v);
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
                <ReferenceFrameSlider onSlide={onSlide} />
            </div>

            <div className="text-div">
                <Stage
                    width={canvasWidth}
                    height={canvasHeight}
                    scaleX={-scale}
                    scaleY={-scale}
                    offsetX={canvasOffsetX}
                    offsetY={canvasOffsetY}
                >
                    <Layer>
                        <SpacetimeEvent ref={event} t0={1} x0={0} />
                    </Layer>
                </Stage>
            </div>
        </div>
    );
}

export default SpacetimeGlobe;
