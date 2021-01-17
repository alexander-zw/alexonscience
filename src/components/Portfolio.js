/**
 * This component contains my portfolio. It's kind of more of a resume but
 * portfolio sounds fancy.
 * 
 * This page is for anyone who came to learn about me personally, including
 * who I am, my skills and interests, and some of my projects that can't be
 * accessed directly on my website.
 */
import React from 'react';
import '../styles/index.css';
import '../styles/Portfolio.css';

function Portfolio() {
    const sections = [
        {
            id: "education",
            title: "Education",
            contents: <p>…</p>
        },
        {
            id: "skills",
            title: "Skills",
            contents: <p>…</p>
        },
        {
            id: "awards",
            title: "Awards",
            contents: <p>…</p>
        },
        {
            id: "experience",
            title: "Experience",
            contents: <p>…</p>
        },
        {
            id: "projects",
            title: "Projects",
            contents: <p>…</p>
        },
    ];

    const tableOfContents = sections.map((sect, index) => (
        <li className="contents-li" key={index}>
            <a href={`#${sect.id}`} className="contents-item">{sect.title}</a>
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
            <nav className="contents-nav text-div">
                <ol className="contents-ol">
                    {tableOfContents}
                </ol>
            </nav>

            <div className="text-div">
                <span className="name-title">Alexander Wu</span>

                <p>Email: alexwu68 [at] berkeley [dot] edu</p>

                {content}
            </div>
        </div>
    );
}

export default Portfolio;
