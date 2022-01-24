import React from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

/**
 * This component is a reusable subcomponent that consists of some text that
 * shows a popup tooltip when clicked on.
 */

interface ExpansionTextProps {
    className?: string;
    children?: JSX.Element | string;
    expansionComponent: JSX.Element | string | (JSX.Element | string)[];
}

function ExpansionText(props: ExpansionTextProps) {
    return (
        <Accordion className={props.className}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>{props.children}</AccordionSummary>
            <AccordionDetails>{props.expansionComponent}</AccordionDetails>
        </Accordion>
    );
}

export default ExpansionText;
