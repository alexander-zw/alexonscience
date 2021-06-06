/**
 * This component is a project based on the minutephysics series on special
 * relativity.
 *
 * The spacetime globe helps visualize Lorentz transformations. The user can
 * add events onto the spacetime diagram and change the reference frame to see
 * what happens.
 *
 * There is no test for this component because Konva doesn't mesh well with
 * React test renderer.
 *
 * TODO:
 * Allow specifying precise event position
 * Allow user to adjust grid size
 * Add way to add a line of events
 * Interpret arguments in URL
 * Allow uploading a scenario in JSON
 */
import React, { Component, useState, createRef } from "react";
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
import Tooltip from "@material-ui/core/Tooltip";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import "../../styles/index.css";
import "../../styles/projects/SpacetimeGlobe.css";
import { eventImages, customScenarios } from "./SpacetimeGlobeEvents";
import MetaTags from "../subcomponents/MetaTags";
import ExpansionText from "../subcomponents/ExpansionText";

function Description() {
    const expansionText = [
        "The spacetime globe allows you to visualize Lorentz transformations, an " +
            "essential concept in special relativity. When you switch reference frames in " +
            "special relativity, the positions and times of individual events don't change the " +
            "way you'd expect from classical mechanics. Try shifting the reference frame with " +
            "the controls on the right and observe how the events in the spacetime diagram " +
            "below change!",
        <br key={1} />,
        <br key={2} />,
        "Note that each time gridmark is one second, and each space gridmark " +
            "is one lightsecond (299,792,458 meters). To learn more, check out the " +
            "minutephysics link.",
    ];

    return (
        <div className="text-div">
            <p>
                The spacetime globe is based on{" "}
                <a href="https://youtube.com/playlist?list=PLoaVOjvkzQtyjhV55wZcdicAz5KexgKvm">
                    this video series
                </a>{" "}
                from minutephysics. Go check it out if you haven{"'"}t already!
            </p>
            <ExpansionText expansionComponent={expansionText}>
                What is a spacetime globe?
            </ExpansionText>
        </div>
    );
}

class ReferenceFrameInput extends Component {
    constructor(props) {
        super(props);

        this.marks = [
            { value: -1, label: "-c" },
            { value: 0, label: "0" },
            { value: 1, label: "c" },
        ];

        this.state = { vValid: true, displayV: 0 };
    }

    setDisplayV = (v) => {
        this.setState({ displayV: v });
    };

    // Validate text input before passing on to props.
    onText = (e) => {
        if (e.target.value == "") {
            return;
        }
        const v = parseFloat(e.target.value);
        if (isNaN(v)) {
            this.setState({ vValid: false });
        } else {
            this.props.onChange(v);
            this.setState({ vValid: true });
        }
    };

    onKeyDown = (e) => {
        // Enter key pressed.
        if (e.keyCode == 13) {
            this.onText(e);
        }
    };

    render() {
        const { vValid, displayV } = this.state;
        const textFieldTooltipText =
            "Enter a custom value for the reference frame velocity; note that in the " +
            "relativistic spacetime, values outside of -1 to 1 are capped";

        return (
            <div className="ref-shift-controls">
                Reference frame shift: <strong>{displayV}c</strong>
                <Tooltip
                    title="Slide to change the velocity of your reference frame"
                    placement="right"
                >
                    <Slider
                        defaultValue={0}
                        step={0.1}
                        marks={this.marks}
                        min={-1}
                        max={1}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(val) => `${val}c`}
                        onChange={(e, v) => this.props.onChange(v)}
                    />
                </Tooltip>
                <div className="ref-shift-text-div">
                    <Tooltip title={textFieldTooltipText} placement="right">
                        <TextField
                            className="ref-shift-text"
                            label="custom"
                            variant="outlined"
                            size="small"
                            error={!vValid}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">c</InputAdornment>,
                            }}
                            InputLabelProps={{
                                margin: "dense",
                            }}
                            onChange={this.onText}
                            onKeyDown={this.onKeyDown}
                        />
                    </Tooltip>
                    {vValid || <span className="ref-shift-text-error">Enter a valid number</span>}
                </div>
            </div>
        );
    }
}

ReferenceFrameInput.propTypes = {
    onChange: PropTypes.func,
};

function EventSelector(props) {
    const tooltipText =
        "Click an event to add it to the diagram; scroll for more options; you can drag existing " +
        "events when the reference frame is 0, or right click to delete it";
    return (
        <div className="event-selector-div">
            <Tooltip title={tooltipText} placement="right">
                <span>Add an event</span>
            </Tooltip>
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
            <Tooltip title="Refresh the diagram if an event isn't showing up" placement="right">
                <Button variant="contained" color="primary" size="small" onClick={props.onRefresh}>
                    Refresh
                </Button>
            </Tooltip>
            <div className="spacing" />
            <Tooltip
                title="Remove all events currently in the diagram; this cannot be undone"
                placement="right"
            >
                <Button variant="contained" color="secondary" size="small" onClick={props.onClear}>
                    Clear all events
                </Button>
            </Tooltip>
        </div>
    );
}

ControlButtons.propTypes = {
    onRefresh: PropTypes.func,
    onClear: PropTypes.func,
};

function ScenarioSelector(props) {
    const [option, setOption] = useState("");

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
            <Tooltip
                title="Add a predefined set of events; don't forget to clear existing events!"
                placement="right"
            >
                <FormControl size="small" fullWidth variant="filled">
                    <InputLabel>Add custom scenario</InputLabel>
                    <Select value={option} onChange={onSelect} label="Age" labelWidth={20}>
                        <MenuItem value="">None</MenuItem>
                        {optionComponents}
                    </Select>
                </FormControl>
            </Tooltip>
        </div>
    );
}

ScenarioSelector.propTypes = {
    onSelect: PropTypes.func,
};

function SpacetimeToggle(props) {
    const [isClassical, setIsClassical] = React.useState(false);

    function onChange(e, newValue) {
        if (newValue !== isClassical) {
            setIsClassical(newValue);
            props.onSwitch(newValue);
        }
    }

    return (
        <div className="spacetime-toggle">
            <ToggleButtonGroup
                value={isClassical}
                exclusive
                onChange={onChange}
                aria-label="text alignment"
            >
                <ToggleButton value={false}>Relativistic spacetime</ToggleButton>
                <ToggleButton value={true}>Classical spacetime</ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}

SpacetimeToggle.propTypes = {
    onSwitch: PropTypes.func,
};

class ContextMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            xPos: 0,
            yPos: 0,
            target: null,
        };
    }

    componentDidMount() {
        document.addEventListener("click", this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick);
    }

    handleClick = () => {
        this.setState({ target: null });
    };

    showContextMenu = (e) => {
        e.evt.preventDefault(); // This e is the Konvas event, so we need to do e.evt.

        if (e.target.parent !== null) {
            // Means this is not the stage but an event.
            this.setState({
                xPos: e.evt.pageX,
                yPos: e.evt.pageY,
                target: e.target,
            });
        } else {
            this.handleClick(); // Hide the menu again.
        }
    };

    render() {
        const { target, xPos, yPos } = this.state;
        const { onDelete } = this.props;

        if (target !== null) {
            return (
                <div
                    className="contextmenu"
                    style={{
                        left: `${xPos}px`,
                        top: `${yPos}px`,
                    }}
                >
                    <div className="menu-option text-div" onClick={() => onDelete(target)}>
                        Delete
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

ContextMenu.propTypes = {
    onDelete: PropTypes.func.isRequired,
};

class SpacetimeEvent extends Component {
    constructor(props) {
        super(props);
        this.state = { t0: props.t0, x0: props.x0, t: props.t0, x: props.x0 };

        this.image = new window.Image();
        this.image.src = props.image.src;
    }

    updateReferenceFrame = (v, gamma, isClassical) => {
        const { t0, x0 } = this.state;
        if (isClassical) {
            this.setState({
                x: x0 - v * t0,
            });
        } else {
            this.setState({
                t: gamma * (t0 - v * x0),
                x: gamma * (x0 - v * t0),
            });
        }
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
    const [isClassical, setIsClassical] = useState(0);

    const referenceFrameInput = createRef();
    const contextMenu = createRef();

    function updateReferenceFrame(v) {
        if (!isClassical && (v >= 1 || v <= -1)) {
            v = Math.sign(v) * 0.999; // Cap at this value to prevent arithmetic error.
        }
        const gamma = 1 / Math.sqrt(1 - v * v);
        events.forEach((event) => {
            event.current.updateReferenceFrame(v, gamma, isClassical);
        });

        referenceFrameInput.current.setDisplayV(v);
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

    function onEventDelete(event) {
        event.destroy(); // The entry is still in eventData, but it won't be rendered.
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

    function changeSpacetime(isClassical) {
        updateReferenceFrame(0);
        setIsClassical(isClassical);
    }

    const events = [];
    for (let i = 0; i < eventData.length; i++) {
        events.push(createRef());
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
            <MetaTags path="/projects/spacetimeglobe" />

            <div className="controls text-div">
                <ReferenceFrameInput onChange={updateReferenceFrame} ref={referenceFrameInput} />
                <EventSelector onSelect={onEventSelect} />
                <ControlButtons onClear={onClear} onRefresh={forceUpdate} />
                <ScenarioSelector onSelect={onScenarioSelect} />
            </div>

            <div className="text-div">
                <ContextMenu ref={contextMenu} onDelete={onEventDelete} />
                <Description />
                <SpacetimeToggle onSwitch={changeSpacetime} />
                <Stage
                    width={canvasWidth}
                    height={canvasHeight}
                    scaleX={scale}
                    scaleY={-scale}
                    offsetX={-canvasOffsetX}
                    offsetY={canvasOffsetY}
                    onContextMenu={(e) => contextMenu.current.showContextMenu(e)}
                >
                    <Layer>
                        {isClassical || <EventTrajectories />}
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
