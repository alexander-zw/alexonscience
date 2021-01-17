/**
 * This component contains my portfolio. It's kind of more of a resume but
 * portfolio sounds fancy.
 * 
 * This page is for anyone who came to learn about me personally, including
 * who I am, my skills and interests, and some of my projects that can't be
 * accessed directly on my website.
 */
import React from 'react';
import '../styles/index.css'
import '../styles/Portfolio.css';

function Portfolio() {
    return (
        <div className="text-div top-margin bottom-margin">
            <span className="name-title">Alexander Wu</span>

            <p>Email: alexwu68 [at] berkeley [dot] edu</p>
        </div>
    );
}

export default Portfolio;

/*
import React from 'react';
import '../styles/index.css'
import '../styles/Portfolio.css';

function Portfolio() {
    return (
        <div>
            <nav class="section-nav">
                <ol>
                    <li><a href="#introduction">Introduction</a></li>
                    <li><a href="#request-response">Request &amp; Response</a></li>
                    <li><a href="#authentication">Authentication</a></li>
                …
                    <li class=""><a href="#filters">Filters</a></li>
                </ol>
            </nav>

            <div className="text-div top-margin bottom-margin">
                <span className="name-title">Alexander Wu</span>

                <p>Email: alexwu68 [at] berkeley [dot] edu</p>

                <h1>Smooth Scrolling Sticky ScrollSpy Navigation</h1>
                <section id="introduction">
                    <h2>Introduction</h2>
                    <p>…</p>
                </section>
                <section id="request-response">
                    <h2>Request &amp; Response</h2>
                    <p>…</p>
                </section>
                <section id="authentication">
                    <h2>Authentication</h2>
                    <p>…</p>
                </section>
                …
                <section id="filters">
                    <h2>Filters</h2>
                    <p>…</p>
                </section>
            </div>
        </div>
    );
}

export default Portfolio;

*/
