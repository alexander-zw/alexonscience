/**
 * The home component is the default component displayed at the index URL.
 * It contains a basic welcome.
 */
import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";
import "../styles/Home.css";
import MetaTags from "./subcomponents/MetaTags";
import ExpansionText from "./subcomponents/ExpansionText";

function Home() {
    const expansionText =
        "As you might be able to tell, I love drawing, even if I'm not that good at " +
        "it. Here you can see a Turing machine, AlphaGo, Albert Einstein, some DNA, " +
        "and Rosalind Franklin. Franklin is particularly underappreciated - she was " +
        "not recognized for a Nobel prize only because she had passed away by the time " +
        "it was awarded.";

    return (
        <div>
            <MetaTags path="/" />

            <div className="text-div bottom-margin">
                <p>
                    Hello there! My name is Alexander Wu. I am a graduate student who enjoys
                    maintaining a YouTube channel and working on personal coding projects. Feel free
                    to explore around!
                </p>

                <p>
                    Check out some of my awesome <Link to="/projects">projects</Link>! Or, if you
                    {"'"}d like to learn about me (I{"'"}m flattered), take a look at my{" "}
                    <Link to="/resume">resume</Link>.
                </p>

                <ExpansionText className="expansion" expansionComponent={expansionText}>
                    What are those drawings in your banner?
                </ExpansionText>
            </div>
        </div>
    );
}

export default Home;
