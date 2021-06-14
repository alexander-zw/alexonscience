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
 * Allow user to adjust grid size
 * Add way to add a line of events
 * Interpret arguments in URL
 * Allow uploading a scenario in JSON
 */
import React, { Component, useState, createRef, useEffect } from "react";
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
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import "../../styles/index.css";
import "../../styles/projects/SpacetimeGlobe.css";
import { eventImages, customScenarios } from "./SpacetimeGlobeEvents";
import MetaTags from "../subcomponents/MetaTags";
import ExpansionText from "../subcomponents/ExpansionText";
import { floatEqual } from "../../utils";

function dimensionInputField(fields, index) {
    if (!Array.isArray(fields)) {
        fields = [fields];
    }
    return (
        <div className="dialog-line" key={index}>
            {fields.map((field, fieldI) => (
                <TextField
                    key={fieldI}
                    className="dimension-text-field"
                    label={field.label}
                    value={field.value}
                    variant="outlined"
                    size="small"
                    error={field.error}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{field.unit}</InputAdornment>,
                    }}
                    InputLabelProps={{
                        margin: "dense",
                    }}
                    onChange={field.onChange}
                />
            ))}
        </div>
    );
}

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

        this.state = { vValid: true, currV: 0 };
    }

    setV = (v) => {
        this.setState({ currV: v });
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
            this.setState({ currV: v });
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
        const { vValid, currV } = this.state;
        const textFieldTooltipText =
            "Enter a custom value for the reference frame velocity; note that in the " +
            "relativistic spacetime, values outside of -1 to 1 are capped";

        return (
            <div className="ref-shift-controls">
                Reference frame shift: <strong>{currV}c</strong>
                <Tooltip
                    title="Slide to change the velocity of your reference frame"
                    placement="right"
                >
                    <Slider
                        value={currV}
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
    const [customDialogOpen, setCustomDialogOpen] = React.useState(false);

    function onCustomEventConfirmed(customImage) {
        props.onSelect(customImage);
        setCustomDialogOpen(false);
    }

    return (
        <div className="event-selector-div">
            <Tooltip title={props.tooltip} placement="right">
                <span>{props.description}</span>
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
                    <Tooltip
                        title="Add an event with custom image"
                        placement="right"
                        classes={{ popper: "custom-event-tooltip" }}
                    >
                        <span>
                            <FontAwesomeIcon
                                id="custom-image-icon"
                                icon={faPlusCircle}
                                size="3x"
                                onClick={() => setCustomDialogOpen(true)}
                            />
                        </span>
                    </Tooltip>
                </div>
            </div>
            <CustomEventDialog
                open={customDialogOpen}
                onClose={() => setCustomDialogOpen(false)}
                onConfirmed={onCustomEventConfirmed}
            />
        </div>
    );
}

EventSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
    description: PropTypes.string,
    tooltip: PropTypes.string,
};

function CustomEventDialog(props) {
    const { onClose, open } = props;

    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [url, setURL] = useState("");
    const [widthValid, setWidthValid] = useState(false);
    const [heightValid, setHeightValid] = useState(false);

    // Validate text input before passing on to props.
    const onWidthText = (e) => {
        setWidth(e.target.value);
        const value = parseFloat(e.target.value);
        setWidthValid(value > EPSILON);
    };
    const onHeightText = (e) => {
        setHeight(e.target.value);
        const value = parseFloat(e.target.value);
        setHeightValid(value > EPSILON);
    };
    const onURLText = (e) => {
        setURL(e.target.value);
    };

    const onEnterDialog = () => {
        setURL("");
        setWidth("");
        setHeight("");
        setWidthValid(false);
        setHeightValid(false);
    };

    const onMoveClicked = () => {
        const customImage = {
            name: "custom_" + url,
            w: parseFloat(width),
            h: parseFloat(height),
            src: url,
        };
        props.onConfirmed(customImage);
    };

    const textFields = [
        {
            label: "width",
            value: width,
            error: !widthValid && width !== "",
            unit: "lightseconds",
            onChange: onWidthText,
        },
        {
            label: "height",
            value: height,
            error: !heightValid && height !== "",
            unit: "lightseconds",
            onChange: onHeightText,
        },
    ];

    const textFieldsComponent = textFields.map(dimensionInputField);

    const urlTooltipText =
        "If you have a local image, you can host it on an image sharing site like imgbb.com, " +
        "then paste the direct link here";
    return (
        <Dialog classes={{ paper: "dialog" }} onClose={onClose} open={open} onEnter={onEnterDialog}>
            <DialogTitle>Add Custom Event</DialogTitle>
            <div className="text-div dialog-content">
                <div className="dialog-line">
                    <Tooltip title={urlTooltipText} placement="right">
                        <TextField
                            label="image URL"
                            value={url}
                            variant="outlined"
                            size="small"
                            InputLabelProps={{
                                margin: "dense",
                            }}
                            onChange={onURLText}
                        />
                    </Tooltip>
                </div>
                {textFieldsComponent}
                <div className="dialog-line center-content">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={onMoveClicked}
                        disabled={!widthValid || !heightValid || url === ""}
                    >
                        Add
                    </Button>
                    <div className="space"></div>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={props.onClose}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

CustomEventDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onConfirmed: PropTypes.func.isRequired,
};

function ControlButtons(props) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const onDialogSelect = (object) => {
        setDialogOpen(false);
        props.onObjectSelect(object);
    };

    return (
        <div className="control-buttons">
            <Tooltip title="Refresh the diagram if an event isn't showing up" placement="right">
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => setDialogOpen(true)}
                >
                    Add an Object
                </Button>
            </Tooltip>
            <div className="spacing" />
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
            <AddObjectDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSelect={onDialogSelect}
            />
        </div>
    );
}

ControlButtons.propTypes = {
    onObjectSelect: PropTypes.func.isRequired,
    onRefresh: PropTypes.func,
    onClear: PropTypes.func,
};

function AddObjectDialog(props) {
    const { onClose, open } = props;

    const [x1, setX1] = useState("");
    const [t1, setT1] = useState("");
    const [x2, setX2] = useState("");
    const [t2, setT2] = useState("");
    const [step, setStep] = useState("");
    const [x1Valid, setX1Valid] = useState(false);
    const [t1Valid, setT1Valid] = useState(false);
    const [x2Valid, setX2Valid] = useState(false);
    const [t2Valid, setT2Valid] = useState(false);
    const [stepValid, setStepValid] = useState(false);
    const [displayError, setDisplayError] = useState(false);

    // Validate text input before passing on to props.
    const onX1Text = (e) => {
        setX1(e.target.value);
        const value = parseFloat(e.target.value);
        setX1Valid(!isNaN(value));
    };
    const onT1Text = (e) => {
        setT1(e.target.value);
        const value = parseFloat(e.target.value);
        setT1Valid(!isNaN(value));
    };
    const onX2Text = (e) => {
        setX2(e.target.value);
        const value = parseFloat(e.target.value);
        setX2Valid(!isNaN(value));
    };
    const onT2Text = (e) => {
        setT2(e.target.value);
        const value = parseFloat(e.target.value);
        setT2Valid(!isNaN(value));
    };
    const onStepText = (e) => {
        setStep(e.target.value);
        const value = parseFloat(e.target.value);
        setStepValid(value > EPSILON); // Cannot be too small.
    };

    const onEnterDialog = () => {
        setX1("");
        setT1("");
        setX2("");
        setT2("");
        setStep("");
        setX1Valid(false);
        setT1Valid(false);
        setX2Valid(false);
        setT2Valid(false);
        setStepValid(false);
        setDisplayError(false);
    };

    const onSelect = (image) => {
        if (!objectValid) {
            setDisplayError(true);
            return;
        }
        const object = {
            x1: parseFloat(x1),
            t1: parseFloat(t1),
            x2: parseFloat(x2),
            t2: parseFloat(t2),
            step: parseFloat(step),
            image,
        };
        props.onSelect(object);
    };

    const objectValid = x1Valid && t1Valid && x2Valid && t2Valid && stepValid;

    const textFields = [
        [
            {
                label: "start x",
                value: x1,
                error: !x1Valid && x1 !== "",
                unit: "lightseconds",
                onChange: onX1Text,
            },
            {
                label: "start t",
                value: t1,
                error: !t1Valid && t1 !== "",
                unit: "seconds",
                onChange: onT1Text,
            },
        ],
        [
            {
                label: "end x",
                value: x2,
                error: !x2Valid && x2 !== "",
                unit: "lightseconds",
                onChange: onX2Text,
            },
            {
                label: "end t",
                value: t2,
                error: !t2Valid && t2 !== "",
                unit: "seconds",
                onChange: onT2Text,
            },
        ],
        {
            label: "t step",
            value: step,
            error: !stepValid && step !== "",
            unit: "seconds",
            onChange: onStepText,
        },
    ];

    const textFieldsComponent = textFields.map(dimensionInputField);

    return (
        <Dialog classes={{ paper: "dialog" }} onClose={onClose} open={open} onEnter={onEnterDialog}>
            <DialogTitle>Add Object Moving at Constant Velocity</DialogTitle>
            <div className="text-div dialog-content">
                <div className="dialog-line">
                    An object is represented with a line of events through spacetime.
                </div>
                {textFieldsComponent}
                <div className="dialog-line dialog-note">All values for the 0 reference frame.</div>
                <div className="dialog-line">
                    <EventSelector
                        onSelect={onSelect}
                        description="Select object type"
                        tooltip="To confirm object, click on the corresponding image"
                    />
                </div>
                {displayError && (
                    <div className="dialog-line add-object-text-error">
                        Enter appropriate values above before selecting image
                    </div>
                )}
                <div className="dialog-line center-content">
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={props.onClose}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

AddObjectDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
};

class ScenarioSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            option: "",
        };
    }

    onSelect = (e) => {
        this.setState({ option: e.target.value });
        if (e.target.value != "") {
            this.props.onSelect(e.target.value);
        }
    };

    clearValue = () => {
        this.setState({ option: "" });
    };

    render() {
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
                        <Select value={this.state.option} onChange={this.onSelect} labelWidth={20}>
                            <MenuItem value="">None</MenuItem>
                            {optionComponents}
                        </Select>
                    </FormControl>
                </Tooltip>
            </div>
        );
    }
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
        const { onMove, onDelete } = this.props;

        const items = [
            { name: "Move", onClick: () => onMove(target) },
            { name: "Delete", onClick: () => onDelete(target) },
        ];

        const itemsComponent = items.map((item, index) => (
            <div className="menu-option text-div" key={index} onClick={item.onClick}>
                {item.name}
            </div>
        ));

        if (target !== null) {
            return (
                <div
                    className="contextmenu"
                    style={{
                        left: `${xPos}px`,
                        top: `${yPos}px`,
                    }}
                >
                    {itemsComponent}
                </div>
            );
        } else {
            return null;
        }
    }
}

ContextMenu.propTypes = {
    onMove: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

function MoveEventDialog(props) {
    const { onClose, open, event } = props;

    if (!event) {
        return null;
    }

    const [newX, setNewX] = useState("");
    const [newT, setNewT] = useState("");
    const [xValid, setXValid] = useState(false);
    const [tValid, setTValid] = useState(false);

    // Validate text input before passing on to props.
    const onXText = (e) => {
        setNewX(e.target.value);
        const value = parseFloat(e.target.value);
        setXValid(!isNaN(value));
    };
    const onTText = (e) => {
        setNewT(e.target.value);
        const value = parseFloat(e.target.value);
        setTValid(!isNaN(value));
    };

    const onEnterDialog = () => {
        setNewX("");
        setNewT("");
        setXValid(false);
        setTValid(false);
    };

    const onMoveClicked = () => {
        props.onMoveConfirmed(parseFloat(newX), parseFloat(newT));
    };

    let { x, t } = event.getPositionInZeroFrame();
    x = x.toFixed(3);
    t = t.toFixed(3);

    const textFields = [
        {
            label: "end x",
            value: newX,
            error: !xValid && newX !== "",
            unit: "lightseconds",
            onChange: onXText,
        },
        {
            label: "end t",
            value: newT,
            error: !tValid && newT !== "",
            unit: "seconds",
            onChange: onTText,
        },
    ];

    const textFieldsComponent = textFields.map(dimensionInputField);

    return (
        <Dialog classes={{ paper: "dialog" }} onClose={onClose} open={open} onEnter={onEnterDialog}>
            <DialogTitle>Move Event</DialogTitle>
            <div className="text-div dialog-content">
                <div className="dialog-line">
                    Current position: x = {x}, t = {t}
                </div>
                {textFieldsComponent}
                <div className="dialog-line dialog-note">All values for the 0 reference frame.</div>
                <div className="dialog-line center-content">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={onMoveClicked}
                        disabled={!xValid || !tValid}
                    >
                        Move
                    </Button>
                    <div className="space" />
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={props.onClose}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

MoveEventDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    event: PropTypes.object,
    onMoveConfirmed: PropTypes.func.isRequired,
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
                t: t0,
                x: x0 - v * t0,
            });
        } else {
            this.setState({
                t: gamma * (t0 - v * x0),
                x: gamma * (x0 - v * t0),
            });
        }
    };

    getPositionInZeroFrame = () => {
        const { x0, t0 } = this.state;
        return { x: x0, t: t0 };
    };

    /** Warning: Does not update reference frame correctly. */
    setPositionInZeroFrame = (x, t) => {
        this.setState({ t0: t, x0: x });
    };

    isImage = (imageComponent) => {
        const { image } = this.props;
        const { x, t } = this.state;
        return (
            imageComponent.attrs.name === image.name &&
            floatEqual(imageComponent.attrs.x, x) &&
            floatEqual(imageComponent.attrs.y, t)
        );
    };

    onDragEnd = (e) => {
        this.setState({
            t0: e.target.y(),
            x0: e.target.x(),
            t: e.target.y(),
            x: e.target.x(),
        });
    };

    onMouseEnter = (e) => {
        if (this.props.draggable) {
            const container = e.target.getStage().container();
            container.style.cursor = "move";
        }
    };

    onMouseLeave = (e) => {
        const container = e.target.getStage().container();
        container.style.cursor = "default";
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
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
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
    const [moveDialogOpen, setMoveDialogOpen] = React.useState(false);
    const [eventToMove, setEventToMove] = React.useState(null);

    const referenceFrameInput = createRef();
    const contextMenu = createRef();
    const scenarioSelector = createRef();

    // Refresh every half second.
    useEffect(() => {
        const interval = setInterval(() => forceUpdate(), 500);
        return () => {
            clearInterval(interval);
        };
    }, []);

    function updateReferenceFrame(v) {
        if (!isClassical && (v >= 1 || v <= -1)) {
            v = Math.sign(v) * 0.999; // Cap at this value to prevent arithmetic error.
        }
        const gamma = 1 / Math.sqrt(1 - v * v);
        events.forEach((event) => {
            event.current.updateReferenceFrame(v, gamma, isClassical);
        });

        referenceFrameInput.current.setV(v);
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

    function onObjectSelect(object) {
        // eslint-disable-next-line no-console
        console.log(object);
    }

    function onContextMenuMoveConfirmed(eventImage) {
        for (const spaceTimeEvent of events) {
            if (spaceTimeEvent.current.isImage(eventImage)) {
                setEventToMove(spaceTimeEvent.current);
                setMoveDialogOpen(true);
                break;
            }
        }
    }

    function onDialogMoveConfirmed(newX, newT) {
        eventToMove.setPositionInZeroFrame(newX, newT);
        updateReferenceFrame(0); // After move, switch back to 0 reference frame.
        setMoveDialogOpen(false);
        forceUpdate();
    }

    const onMoveDialogClose = () => {
        setMoveDialogOpen(false);
    };

    function onEventDelete(event) {
        event.destroy(); // The entry is still in eventData, but it won't be rendered.
        forceUpdate();
    }

    function onClear() {
        eventData.length = 0;
        scenarioSelector.current.clearValue();
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

    const eventTooltip =
        "Click an event to add it to the diagram; scroll for more options; you can drag existing " +
        "events when the reference frame is 0, or right click to move or delete it";
    return (
        <div className="outer-container top-margin bottom-margin">
            <MetaTags path="/projects/spacetimeglobe" />

            <div className="controls text-div">
                <ReferenceFrameInput onChange={updateReferenceFrame} ref={referenceFrameInput} />
                <EventSelector
                    onSelect={onEventSelect}
                    description="Add an event"
                    tooltip={eventTooltip}
                />
                <ControlButtons
                    onObjectSelect={onObjectSelect}
                    onClear={onClear}
                    onRefresh={forceUpdate}
                />
                <ScenarioSelector onSelect={onScenarioSelect} ref={scenarioSelector} />
            </div>

            <div className="text-div">
                <ContextMenu
                    ref={contextMenu}
                    onMove={onContextMenuMoveConfirmed}
                    onDelete={onEventDelete}
                />
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

            <MoveEventDialog
                open={moveDialogOpen}
                onClose={onMoveDialogClose}
                event={eventToMove}
                onMoveConfirmed={onDialogMoveConfirmed}
            />
        </div>
    );
}

export default SpacetimeGlobe;
