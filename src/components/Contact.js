/**
 * This component contains my contact information.
 */
import React from 'react';
import '../styles/index.css'

const Contact = () => {
    return (
       <div className="text-div bottom-div">
            <p>Feel free to reach out to me!</p>
            <p>Email: alexwu68 [at] berkeley [dot] edu</p>
            <p>
                <a href="https://www.youtube.com/channel/UCaV0jdBmPzgBk6AYweICoMA">Youtube</a>
                &nbsp;(tinyurl.com/alexonscience)
            </p>
            <p><a href="https://github.com/alexander-zw">Github</a></p>
            <p><a href="https://www.linkedin.com/in/alexander-wu-a0145a173/">Linkedin</a></p>
       </div>
    );
}

export default Contact;
