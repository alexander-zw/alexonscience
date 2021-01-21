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
import { Stage, Layer, Line, Star } from "react-konva";
import Slider from "@material-ui/core/Slider";

import "../../styles/index.css";
import "../../styles/projects/SpacetimeGlobe.css";

function FixedSizeStar(props) {
    return (
        <Star
            x={props.x}
            y={props.y}
            numPoints={5}
            innerRadius={0.13}
            outerRadius={0.3}
            rotation={36}
            fill={props.fill ? props.fill : "green"}
        />
    );
}

FixedSizeStar.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    fill: PropTypes.string,
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
        return <FixedSizeStar x={x} y={t} fill={this.props.fill} />;
    }
}

SpacetimeEvent.propTypes = {
    t0: PropTypes.number.isRequired,
    x0: PropTypes.number.isRequired,
    fill: PropTypes.string,
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

function Grid() {
    const left = -4;
    const right = 4;
    const top = 5;
    const bottom = -2;

    const points = [];
    for (let i = bottom; i <= top; i++) {
        points.push([left, i, right, i]); // Horizontal line.
    }
    for (let i = left; i <= right; i++) {
        points.push([i, bottom, i, top]); // Vertical line.
    }

    const isZeroAxis = (x, y) => x == 0 || y == 0;
    return points.map((p, i) => (
        <Line
            points={p}
            stroke="black"
            strokeWidth={isZeroAxis(p[0], p[1]) ? 0.07 : 0.05}
            lineCap="round"
            key={i}
        />
    ));
}

function SpacetimeGlobe() {
    const scale = 80;
    const canvasWidth = window.innerWidth * 0.7 - 100;
    const canvasHeight = 600;
    const canvasOffsetX = (canvasWidth * 0.5) / scale;
    const canvasOffsetY = (canvasHeight * 0.7) / scale;

    const eventData = [
        { t: -1, x: 0, fill: "red" },
        { t: 0, x: 0, fill: "red" },
        { t: 1, x: 0, fill: "red" },
        { t: 2, x: 0, fill: "red" },
        { t: 3, x: 0, fill: "red" },
        { t: 4, x: 0, fill: "red" },
        { t: -1, x: -0.5, fill: "green" },
        { t: 0, x: 0, fill: "green" },
        { t: 1, x: 0.5, fill: "green" },
        { t: 2, x: 1, fill: "green" },
        { t: 3, x: 1.5, fill: "green" },
        { t: 4, x: 2, fill: "green" },
        { t: 0, x: -3, fill: "blue" },
        { t: 0, x: -2, fill: "blue" },
        { t: 0, x: -1, fill: "blue" },
        { t: 0, x: 0, fill: "blue" },
        { t: 0, x: 1, fill: "blue" },
        { t: 0, x: 2, fill: "blue" },
        { t: 0, x: 3, fill: "blue" },
        { t: -1, x: -1, fill: "yellow" },
        { t: 0, x: 0, fill: "yellow" },
        { t: 1, x: 1, fill: "yellow" },
        { t: 2, x: 2, fill: "yellow" },
        { t: 3, x: 3, fill: "yellow" },
        { t: 4, x: 4, fill: "yellow" },
        { t: -1, x: 2, fill: "orange" },
        { t: 0, x: 2, fill: "orange" },
        { t: 1, x: 2, fill: "orange" },
        { t: 2, x: 2, fill: "orange" },
        { t: 3, x: 2, fill: "orange" },
        { t: 4, x: 2, fill: "orange" },
    ];

    const events = [];
    for (let i = 0; i < eventData.length; i++) {
        events.push(React.createRef());
    }

    const eventComponents = eventData.map((data, i) => (
        <SpacetimeEvent ref={events[i]} t0={data.t} x0={data.x} fill={data.fill} key={i} />
    ));

    function onSlide(e, v) {
        if (v == 1 || v == -1) {
            v *= 0.999; // Prevent divide by zero.
        }
        const gamma = 1 / Math.sqrt(1 - v * v);
        events.forEach((event) => {
            event.current.updateReferenceFrame(gamma, v);
        });
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
                    scaleX={scale}
                    scaleY={-scale}
                    offsetX={-canvasOffsetX}
                    offsetY={canvasOffsetY}
                >
                    <Layer>
                        <Grid />
                        {eventComponents}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
}

export default SpacetimeGlobe;
