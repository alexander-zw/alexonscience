/**
 * This component is a reusable subcomponent that consists of some text that
 * shows a popup tooltip when clicked on.
 */
import React from "react";
import PropTypes from "prop-types";
import Collapsible from "react-collapsible";
import "../../styles/subcomponents/ExpansionText.css";

function ExpansionText(props) {
    return (
        <Collapsible
            triggerClassName="outer"
            triggerOpenedClassName="outer"
            trigger={props.children}
        >
            {props.expansionComponent}
        </Collapsible>
    );
}

ExpansionText.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    expansionComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default ExpansionText;
