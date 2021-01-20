/**
 * This component contains links to my projects.
 */
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../styles/index.css";

function Projects() {
    return (
        <div>
            <Helmet>
                <title>Projects | ALEX on Science</title>
                <meta name="Description" content="Alex's projects" />
                <meta name="KeyWords" content="project, alex, alexander, wu, science, youtube" />
            </Helmet>

            <div className="text-div top-margin bottom-margin">
                <Link to="/projects/spacetimeglobe">Go to Spacetime Globe</Link>
            </div>
        </div>
    );
}

export default Projects;
