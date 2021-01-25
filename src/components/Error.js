/**
 * The error component is basically a 404 page displayed when no other
 * content applies.
 */
import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";
import MetaTags from "./subcomponents/MetaTags";

function Error() {
    return (
        <div className="text-div">
            <MetaTags path="/error" />
            <p>
                Oops, this page does not exist!{" "}
                <Link to="/" exact>
                    Back to Home
                </Link>
            </p>
        </div>
    );
}

export default Error;
