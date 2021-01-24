/**
 * This component contains links to my projects.
 */
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../styles/index.css";
import "../styles/Projects.css";
import spacetime_globe from "../images/spacetime_globe/spacetime_globe.png";

function Projects() {
    return (
        <div>
            <Helmet>
                <title>Projects | ALEX on Science</title>
                <meta name="Description" content="Alex's projects" />
                <meta name="KeyWords" content="project, alex, alexander, wu, science, youtube" />
            </Helmet>

            <div className="text-div top-margin bottom-margin">
                <Link className="link" to="/projects/spacetimeglobe">
                    <div className="project-box">
                        <img className="thumbnail" src={spacetime_globe} alt="spacetime globe" />
                        <div className="project-text">
                            <div className="project-title">Spacetime Globe</div>
                            This interactive visualization allows you to play around with Lorentz
                            transformations to really get a feel for how special relativity works.
                            Add events onto the spacetime diagram and see how shifting the reference
                            reference frame affects them!
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Projects;
