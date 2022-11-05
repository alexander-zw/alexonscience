import "../styles/index.css";
import "../styles/Projects.css";

import React from "react";
import { Link } from "react-router-dom";

import spacetime_globe from "../images/spacetime_globe/spacetime_globe.png";
import MetaTags from "./subcomponents/MetaTags";

interface ProjectBlockProps {
    path: string;
    title: string;
    image: { src: string; alt: string };
    description: string;
}

const ProjectBlock = ({ path, title, description, image }: ProjectBlockProps) => {
    return (
        <div className="text-div top-margin bottom-margin">
            <Link className="link" to={`/projects/${path}`}>
                <div className="project-box">
                    <img className="thumbnail" src={image.src} alt={image.alt} />
                    <div className="project-text">
                        <div className="project-title">{title}</div>
                        {description}
                    </div>
                </div>
            </Link>
        </div>
    );
};

/**
 * This component contains links to my projects.
 */
function Projects() {
    const projects: ProjectBlockProps[] = [
        {
            path: "spacetimeglobe",
            title: "Spacetime Globe",
            image: { src: spacetime_globe, alt: "spacetime globe" },
            description:
                "This interactive visualization allows you to play around with Lorentz " +
                "transformations to really get a feel for how special relativity works. Add " +
                "events onto the spacetime diagram and see how shifting the reference " +
                "reference frame affects them!",
        },
        {
            path: "explodegifcreator",
            title: "Explode Gif Creator",
            image: { src: spacetime_globe, alt: "explode" },
            description:
                "This tool allows you to turn an image into an exploding gif, which can then " +
                "be turned into an emoji!",
        },
    ];

    const projectBlocks = projects.map((props: ProjectBlockProps) => (
        <ProjectBlock key={props.path} {...props} />
    ));

    return (
        <div>
            <MetaTags path="/projects" />
            {projectBlocks}
        </div>
    );
}

export default Projects;
