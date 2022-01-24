import "../styles/index.css";
import "../styles/Contact.css";

import React from "react";

import { faGithub, faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MetaTags from "./subcomponents/MetaTags";

/**
 * This component contains my contact information, including some fancy social
 * media icons.
 */
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
            link: "https://www.linkedin.com/in/azwu",
        },
    ];

    const socialComponent = accounts.map((account, index) => (
        <a
            href={account.link}
            title={account.title}
            className={`${account.class} social`}
            key={index}
        >
            <FontAwesomeIcon icon={account.icon} size="2x" />
        </a>
    ));

    return (
        <div className="text-div bottom-margin">
            <MetaTags path="/contact" />

            <p>Feel free to reach out to me!</p>
            <p>Email: alexwu68 [at] berkeley [dot] edu</p>

            <p>Social media:</p>
            <div className="social-container">{socialComponent}</div>
        </div>
    );
}

export default Contact;
