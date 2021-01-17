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
            <span class="name-title">Alexander Wu</span>

            <p>Email: alexwu68 [at] berkeley [dot] edu</p>
        </div>
    );
}

export default Portfolio;
