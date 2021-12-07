/**
 * This component contains my resume.
 *
 * This page is for anyone who came to learn about me personally, including
 * who I am, my skills and interests, and some of my projects that can't be
 * accessed directly on my website.
 */
import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";
import "../styles/Resume.css";
import alexander_wu from "../images/alexander_wu.jpg";
import MetaTags from "./subcomponents/MetaTags";

function Resume() {
    const thesisLink = "https://www2.eecs.berkeley.edu/Pubs/TechRpts/2021/EECS-2021-102.html";

    // "contents" is not including heading.
    const sections = [
        {
            id: "education",
            title: "Education",
            contents: (
                <div>
                    <p>
                        Thesis:{" "}
                        <a href={thesisLink}>
                            Optimizations and Improvements to Cryptographic Libraries for zkSNARKs
                        </a>
                    </p>
                </div>
            ),
        },
        {
            id: "projects",
            title: "Projects",
            contents: (
                <div>
                    <p>
                        See my <a href="https://github.com/alexander-zw">GitHub</a> for more.
                    </p>
                    <p>
                        <strong>Guavabots</strong>
                        <br />
                        NP-complete graph problem with greedy algorithms and integer linear
                        programming, Python
                    </p>
                    <p>
                        <strong>Pintos</strong>
                        <br />
                        Operating system file storage with FFS, priority thread scheduling, and
                        process execution, C
                    </p>
                    <p>
                        <strong>Secure File Storage</strong>
                        <br />
                        Cryptographically encrypted and signed file storage and sharing system, Go
                    </p>
                    <p>
                        <strong>The Labyrinth</strong>
                        <br />
                        2D maze game with world generation and game mechanics, Java
                    </p>
                    <p>
                        <strong>BearMaps</strong>
                        <br />
                        Interactive navigation application similar to Google Maps, uses graphs and
                        A* search, Java
                    </p>
                    <p>
                        <strong>Stereo Vision</strong>
                        <br />
                        Detecting depth with two different images, quad tree compression, C and
                        RISC-V
                    </p>
                </div>
            ),
        },
    ];

    const tableOfContents = sections.map((sect, index) => (
        <li className="contents-li" key={index}>
            <a href={`#${sect.id}`} className="contents-item">
                {sect.title}
            </a>
        </li>
    ));

    const content = sections.map((sect, index) => (
        <section id={sect.id} className="section" key={index}>
            <h2>{sect.title}</h2>
            {sect.contents}
        </section>
    ));

    return (
        <div className="outer-container top-margin bottom-margin">
            <MetaTags path="/resume" />

            <nav className="contents-nav text-div">
                <ol className="contents-ol">{tableOfContents}</ol>
            </nav>

            <div className="text-div">
                <img className="photo" src={alexander_wu} alt={"Alexander Wu"} />

                <span className="name-title">Alexander Wu</span>

                <p>
                    Hello! I am not currently seeking a new position, but you can{" "}
                    <Link to="/contact">contact me</Link> for other matters. I{"'"}m a software
                    developer who expresses his love for science through my YouTube channel, among
                    other things. I{"'"}m passionate about education and enjoy doing volunteering
                    work. In my spare time, I read novels, work on projects, practice Yoga, and ride
                    my bike everywhere.
                </p>

                {content}
            </div>
        </div>
    );
}

export default Resume;
