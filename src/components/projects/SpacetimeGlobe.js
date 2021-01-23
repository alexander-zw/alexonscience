/**
 * This component contains my resume.
 *
 * This page is for anyone who came to learn about me personally, including
 * who I am, my skills and interests, and some of my projects that can't be
 * accessed directly on my website.
 *
 * TODO:
 * Add custom senarios
 * Add tooltips to explain controls
 * Add classical spacetime
 * Add way to add a line of events
 */
import React, { Component, useState } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { Stage, Layer, Line, Arrow, Text, Rect, Image } from "react-konva";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import "../../styles/index.css";
import "../../styles/projects/SpacetimeGlobe.css";
import { eventImages, customScenarios } from "./SpacetimeGlobeEvents";

function ReferenceFrameInput(props) {
    const marks = [
        { value: -1, label: "-c" },
        { value: 0, label: "0" },
        { value: 1, label: "c" },
    ];

    const [vValid, setVValid] = useState(true);

    // Validate text input before passing on to props.
    function onText(e) {
        if (e.target.value == "") {
            return;
        }
        const v = parseFloat(e.target.value);
        if (-1 <= v && v <= 1) {
            props.onChange(v);
            setVValid(true);
        } else {
            setVValid(false);
        }
    }

    return (
        <div className="ref-shift-controls">
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
                onChange={(e, v) => props.onChange(v)}
            />
            <div className="ref-shift-text-div">
                <TextField
                    className="ref-shift-text"
                    label="custom"
                    variant="outlined"
                    error={!vValid}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">c</InputAdornment>,
                    }}
                    InputLabelProps={{
                        margin: "dense",
                    }}
                    onChange={onText}
                />
                {vValid || (
                    <span className="ref-shift-text-error">Enter a number from -1 to 1</span>
                )}
            </div>
        </div>
    );
}

ReferenceFrameInput.propTypes = {
    onChange: PropTypes.func,
};

function EventSelector(props) {
    return (
        <div className="event-selector-div">
            Add an event
            <div className="event-selector-outer">
                <div className="event-selector">
                    {eventImages.map((image, i) => (
                        <img
                            className="event-image"
                            src={image.src}
                            alt={image.name}
                            onClick={() => props.onSelect(image)}
                            key={i}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

EventSelector.propTypes = {
    onSelect: PropTypes.func,
};

function ControlButtons(props) {
    return (
        <div className="control-buttons">
            <Button variant="contained" color="primary" size="small" onClick={props.onRefresh}>
                Refresh
            </Button>
            <div className="spacing" />
            <Button variant="contained" color="secondary" size="small" onClick={props.onClear}>
                Clear all events
            </Button>
        </div>
    );
}

ControlButtons.propTypes = {
    onRefresh: PropTypes.func,
    onClear: PropTypes.func,
};

function ScenarioSelector(props) {
    const [option, setOption] = useState("...");

    function onSelect(e) {
        setOption(e.target.value);
        if (e.target.value != "") {
            props.onSelect(e.target.value);
        }
    }

    const optionComponents = customScenarios.map((scenario, i) => (
        <MenuItem value={scenario} key={i}>
            {scenario.name}
        </MenuItem>
    ));

    return (
        <div className="scenario-selector">
            <FormControl size="small" fullWidth variant="filled">
                <InputLabel>Add custom scenario</InputLabel>
                <Select value={option} onChange={onSelect} label="Age" labelWidth={20}>
                    <MenuItem value="">None</MenuItem>
                    {optionComponents}
                </Select>
            </FormControl>
        </div>
    );
}

ScenarioSelector.propTypes = {
    onSelect: PropTypes.func,
};

class SpacetimeEvent extends Component {
    constructor(props) {
        super(props);
        this.state = { t0: props.t0, x0: props.x0, t: props.t0, x: props.x0 };

        this.image = new window.Image();
        this.image.src = props.image.src;
    }

    updateReferenceFrame = (gamma, v) => {
        const { t0, x0 } = this.state;
        this.setState({
            t: gamma * (t0 - v * x0),
            x: gamma * (x0 - v * t0),
        });
    };

    onDragEnd = (e) => {
        this.setState({
            t0: e.target.y(),
            x0: e.target.x(),
        });
    };

    render() {
        const { image, draggable } = this.props;
        const { x, t } = this.state;
        return (
            <Image
                x={x}
                y={t}
                width={image.w}
                height={image.h}
                scaleY={-1}
                offsetX={image.w * 0.5}
                offsetY={image.h * 0.5}
                image={this.image}
                name={image.name}
                draggable={draggable}
                onDragEnd={this.onDragEnd}
            />
        );
    }
}

SpacetimeEvent.propTypes = {
    t0: PropTypes.number.isRequired,
    x0: PropTypes.number.isRequired,
    image: PropTypes.object.isRequired,
    draggable: PropTypes.bool,
};

const LEFT = -4;
const RIGHT = 4;
const TOP = 5;
const BOTTOM = -2;

function Grid() {
    const arrowLen = 0.3;

    const lines = [];
    // Horizontal line.
    for (let i = BOTTOM; i <= TOP; i++) {
        if (i == 0) {
            lines.push([LEFT - arrowLen, i, RIGHT + arrowLen, i]);
        } else {
            lines.push([LEFT, i, RIGHT, i]);
        }
    }
    // Vertical line.
    for (let i = LEFT; i <= RIGHT; i++) {
        if (i == 0) {
            lines.push([i, BOTTOM - arrowLen, i, TOP + arrowLen]);
        } else {
            lines.push([i, BOTTOM, i, TOP]);
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
                key={i}
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
            if (BOTTOM <= y && y <= TOP) {
                points.push(x);
                points.push(y);
            }
        } else {
            if (LEFT <= y && y <= RIGHT) {
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
    for (let i = BOTTOM + 1; i <= TOP - 1; i++) {
        if (i != 0) {
            lines.push(hyperbola(LEFT, RIGHT, i, renderStep, true));
        }
    }
    // Vertical hyperbolas: ignore left, right, and zero lines.
    for (let i = LEFT + 1; i <= RIGHT - 1; i++) {
        if (i != 0) {
            lines.push(hyperbola(BOTTOM, TOP, i, renderStep, false));
        }
    }
    // Diagonals.
    const lowerLeft = Math.max(LEFT, BOTTOM);
    const lowerRight = Math.min(RIGHT, -BOTTOM);
    const upperLeft = Math.min(-LEFT, TOP);
    const upperRight = Math.min(RIGHT, TOP);
    lines.push([lowerLeft, lowerLeft, upperRight, upperRight]);
    lines.push([-upperLeft, upperLeft, lowerRight, -lowerRight]);

    return lines.map((line, i) => (
        <Line points={line} stroke="#e1e3eb" strokeWidth={0.05} key={i} />
    ));
}

function Labels(props) {
    // These numbers were through trial and error.
    const spaceLabelX = RIGHT - 0.73;
    const spaceLabelY = 0.5;
    return [
        // Rect to block part of the grid.
        <Rect
            x={spaceLabelX}
            y={spaceLabelY - 0.363}
            fill="#f8f8f8"
            width={1}
            height={0.29}
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
            y={TOP + 0.4}
            scaleX={props.scale}
            scaleY={-props.scale}
            fontSize={30}
            fontStyle="bold"
            fill="black"
            text="time"
            key={2}
        />,
    ];
}

Labels.propTypes = {
    scale: PropTypes.number.isRequired,
};

const eventData = [];

function SpacetimeGlobe() {
    // Most of these values were obtained through trial and error.
    const scale = 80;
    const canvasWidth = window.innerWidth * 0.7 - 80;
    const canvasHeight = 625;
    const canvasOffsetX = (canvasWidth * 0.5) / scale;
    const canvasOffsetY = (canvasHeight * 0.69) / scale;

    const [draggable, setDraggable] = useState(true);
    const [updateVar, setUpdateVar] = useState(0);

    function updateReferenceFrame(v) {
        if (v == 1 || v == -1) {
            v *= 0.999; // Prevent divide by zero.
        }
        const gamma = 1 / Math.sqrt(1 - v * v);
        events.forEach((event) => {
            event.current.updateReferenceFrame(gamma, v);
        });

        setDraggable(v == 0); // Can only drag at default reference frame.
    }

    function forceUpdate() {
        setUpdateVar(updateVar + 1);
    }

    function onEventSelect(image) {
        updateReferenceFrame(0); // Only add new events at 0 reference frame.
        eventData.push({ t: 0, x: LEFT, image: image });
        forceUpdate();
    }

    function onClear() {
        eventData.length = 0;
        forceUpdate();
    }

    function onScenarioSelect(scenario) {
        updateReferenceFrame(0);
        eventData.push(...scenario.events);
        forceUpdate();
    }

    const events = [];
    for (let i = 0; i < eventData.length; i++) {
        events.push(React.createRef());
    }

    const eventComponents = eventData.map((data, i) => (
        <SpacetimeEvent
            ref={events[i]}
            t0={data.t}
            x0={data.x}
            image={data.image}
            draggable={draggable}
            key={i}
        />
    ));

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
                <ReferenceFrameInput onChange={updateReferenceFrame} />
                <EventSelector onSelect={onEventSelect} />
                <ControlButtons onClear={onClear} onRefresh={forceUpdate} />
                <ScenarioSelector onSelect={onScenarioSelect} />
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
