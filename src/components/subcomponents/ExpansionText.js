/**
 * This component is a reusable subcomponent that consists of some text that
 * shows a popup tooltip when clicked on.
 */
import React from "react";
import PropTypes from "prop-types";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function ExpansionText(props) {
    return (
        <Accordion className={props.className}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>{props.children}</AccordionSummary>
            <AccordionDetails>{props.expansionComponent}</AccordionDetails>
        </Accordion>
    );
}

ExpansionText.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    expansionComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default ExpansionText;
