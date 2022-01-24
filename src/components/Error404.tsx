import "../styles/index.css";

import React from "react";
import { Link } from "react-router-dom";

import MetaTags from "./subcomponents/MetaTags";

/**
 * This is the 404 Error page.
 */
function Error404() {
    return (
        <div className="text-div">
            <MetaTags path="/error" />
            <p>
                Oops, this page does not exist! <Link to="/">Back to Home</Link>
            </p>
        </div>
    );
}

export default Error404;
