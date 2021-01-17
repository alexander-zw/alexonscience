/**
 * This component contains my contact information, including some fancy social
 * media icons.
 */
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faGithub,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import '../styles/index.css'
import '../styles/Contact.css';

function SocialFollow() {
    return (
        <div class="social-container">
            <a href="https://www.youtube.com/channel/UCaV0jdBmPzgBk6AYweICoMA"
                title="YouTube" className="youtube social">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
            <a href="https://github.com/alexander-zw" title="GitHub" className="github social">
                <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href="https://www.linkedin.com/in/alexander-wu-a0145a173"
                title="LinkedIn" className="linkedin social">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
        </div>
    );
}

function Contact() {
    return (
        <div className="text-div bottom-margin">
            <p>Feel free to reach out to me!</p>
            <p>Email: alexwu68 [at] berkeley [dot] edu</p>

            <p>Social media:</p>
            <SocialFollow />
        </div>
    );
}

export default Contact;
