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
import { Stage, Layer, Line, Arrow, Text, Rect, Star } from "react-konva";
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

const left = -4;
const right = 4;
const top = 5;
const bottom = -2;

function Grid() {
    const arrowLen = 0.3;

    const lines = [];
    // Horizontal line.
    for (let i = bottom; i <= top; i++) {
        if (i == 0) {
            lines.push([left - arrowLen, i, right + arrowLen, i]);
        } else {
            lines.push([left, i, right, i]);
        }
    }
    // Vertical line.
    for (let i = left; i <= right; i++) {
        if (i == 0) {
            lines.push([i, bottom - arrowLen, i, top + arrowLen]);
        } else {
            lines.push([i, bottom, i, top]);
        }
    }

    const isZeroAxis = (x, y) => x == 0 || y == 0;
    return lines.map((line, i) =>
        isZeroAxis(line[0], line[1]) ? (
            <Arrow
                points={line}
                stroke="black"
                fill="black"
                strokeWidth={0.07}
                pointerLength={0.15}
                pointerWidth={0.15}
                pointerAtBeginning
            />
        ) : (
            <Line points={line} stroke="black" strokeWidth={0.05} lineCap="round" key={i} />
        ),
    );
}

function hyperbola(start, end, shift, step, isHorizontal) {
    const numPoints = (end - start) / step + 1;
    const points = [];
    for (let i = 0; i < numPoints; i++) {
        const x = start + i * step;
        const y = Math.sign(shift) * Math.sqrt(x * x + shift * shift);
        // Ignore if out of bounds.
        if (isHorizontal) {
            if (bottom <= y && y <= top) {
                points.push(x);
                points.push(y);
            }
        } else {
            if (left <= y && y <= right) {
                points.push(y);
                points.push(x);
            }
        }
    }
    return points;
}

function EventTrajectories() {
    // Tension is not really necessary when the step is this small.
    const renderStep = 0.1;

    const lines = [];
    // Horizontal hyperbolas: ignore top, bottom, and zero lines.
    for (let i = bottom + 1; i <= top - 1; i++) {
        if (i != 0) {
            lines.push(hyperbola(left, right, i, renderStep, true));
        }
    }
    // Vertical hyperbolas: ignore left, right, and zero lines.
    for (let i = left + 1; i <= right - 1; i++) {
        if (i != 0) {
            lines.push(hyperbola(bottom, top, i, renderStep, false));
        }
    }
    // Diagonals.
    const lowerLeft = Math.max(left, bottom);
    const lowerRight = Math.min(right, -bottom);
    const upperLeft = Math.min(-left, top);
    const upperRight = Math.min(right, top);
    lines.push([lowerLeft, lowerLeft, upperRight, upperRight]);
    lines.push([-upperLeft, upperLeft, lowerRight, -lowerRight]);
    // eslint-disable-next-line no-console
    console.log(`${lowerLeft}, ${lowerRight}`);

    return lines.map((line, i) => (
        <Line points={line} stroke="#e1e3eb" strokeWidth={0.05} key={i} />
    ));
}

function Labels(props) {
    // These numbers were through trial and error.
    const spaceLabelX = right - 0.75;
    const spaceLabelY = 0.5;
    return [
        // Rect to block part of the grid.
        <Rect
            x={spaceLabelX}
            y={spaceLabelY - 0.35}
            fill="#f8f8f8"
            width={1}
            height={0.27}
            key={0}
        />,
        <Text
            x={spaceLabelX}
            y={spaceLabelY}
            scaleX={props.scale}
            scaleY={-props.scale}
            fontSize={30}
            fontStyle="bold"
            fill="black"
            text="space"
            key={1}
        />,
        <Text
            x={0.2}
            y={top + 0.4}
            scaleX={props.scale}
            scaleY={-props.scale}
            fontSize={30}
            fontStyle="bold"
            fill="black"
            text="time"
            key={1}
        />,
    ];
}

Labels.propTypes = {
    scale: PropTypes.number.isRequired,
};

function SpacetimeGlobe() {
    // Most of these values were obtained through trial and error.
    const scale = 80;
    const canvasWidth = window.innerWidth * 0.7 - 80;
    const canvasHeight = 625;
    const canvasOffsetX = (canvasWidth * 0.5) / scale;
    const canvasOffsetY = (canvasHeight * 0.69) / scale;

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
                        <EventTrajectories />
                        <Grid />
                        <Labels scale={1 / scale} />
                        {eventComponents}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
}

export default SpacetimeGlobe;
