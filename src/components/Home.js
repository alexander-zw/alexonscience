/**
 * The home component is the default component displayed at the index URL.
 * It contains a basic welcome.
 */
import React, { useState } from 'react';
import '../styles/index.css';
import '../styles/Home.css';

function Home() {
    const [showPopup, setShowPopup] = useState(false);

    function displayPopup() {
        console.log(`DISPLAYING POPUP: ${showPopup}`);
        setShowPopup(!showPopup);
    };

    console.log(`SHOW POPUP IS ${showPopup}, FUNC IS ${displayPopup}`);

    return (
        <div>
            <div className="text-div bottom-div">
                <p>
                    Hello there! My name is Alexander Wu. I am a college student who enjoys
                    maintaining a YouTube channel and working on personal coding projects.
                    Feel free to explore around!
                </p>

                <div className="popup" onClick={displayPopup}>
                    <span className="popup-outer">
                        What are those drawings in your banner?
                    </span>
                    <span className={`popuptext${showPopup ? " show" : ""}`}>
                        As you might be able to tell, I love drawing, even if I'm not that
                        good at it. Here you can see a Turing machine, AlphaGo, Albert Einstein,
                        some DNA, and Rosalind Franklin. Franklin is particularly
                        underappreciated - she was not recognized for a Nobel prize only because
                        she had passed away by the time it was awarded.
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Home;
