/**
 * The error component is basically a 404 page displayed when no other
 * content applies.
 */
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../styles/index.css";

function Error() {
    return (
        <div className="text-div">
            <Helmet>
                <title>Error | ALEX on Science</title>
                <meta name="Description" content="Error page" />
                <meta name="KeyWords" content="error, alex, alexander, wu, science, youtube" />
            </Helmet>
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
