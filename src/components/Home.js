/**
 * The home component is the default component displayed at the index URL.
 * It contains a basic welcome.
 */
import React from 'react';
import '../styles/index.css';

function Home() {
    return (
        <div>
            <div className="text-div">
                <p>
                    Hello there! My name is Alexander Wu. I am a college student who enjoys
                    maintaining a YouTube channel and working on personal coding projects.
                    Feel free to explore around!
                </p>
            </div>
        </div>
    );
}

export default Home;
