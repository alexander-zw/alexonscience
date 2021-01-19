/**
 * This component contains my contact information, including some fancy social
 * media icons.
 */
import React from 'react';
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faGithub,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import '../styles/index.css';
import '../styles/Contact.css';

function Contact() {
    const accounts = [
        {
            title: "YouTube",
            class: "youtube",
            icon: faYoutube,
            link: "https://www.youtube.com/channel/UCaV0jdBmPzgBk6AYweICoMA",
        },
        {
            title: "GitHub",
            class: "github",
            icon: faGithub,
            link: "https://github.com/alexander-zw",
        },
        {
            title: "LinkedIn",
            class: "linkedin",
            icon: faLinkedin,
            link: "https://www.linkedin.com/in/alexander-wu-a0145a173",
        },
    ];

    const socialComponent = accounts.map((account, index) => (
        <a href={account.link} title={account.title}
            className={`${account.class} social`} key={index}>
            <FontAwesomeIcon icon={account.icon} size="2x" />
        </a>
    ));

    return (
        <div className="text-div bottom-margin">
            <Helmet>
                <title>Contact Me | ALEX on Science</title>
                <meta name="Description" content="Contact Alex" />
                <meta name="KeyWords" content="contact, alex, alexander, wu, science, youtube" />
            </Helmet>

            <p>Feel free to reach out to me!</p>
            <p>Email: alexwu68 [at] berkeley [dot] edu</p>

            <p>Social media:</p>
            <div className="social-container">
                {socialComponent}
            </div>
        </div>
    );
}

export default Contact;
