/**
 * This component contains my resume.
 *
 * This page is for anyone who came to learn about me personally, including
 * who I am, my skills and interests, and some of my projects that can't be
 * accessed directly on my website.
 */
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../styles/index.css";
import "../styles/Resume.css";

function Resume() {
    // "contents" is not including heading.
    const sections = [
        {
            id: "education",
            title: "Education",
            contents: (
                <div>
                    <p>
                        <strong>University of California, Berkeley</strong>: 08/2020 - 05/2021{" "}
                        <br />
                        Master of Science, Electrical Engineering and Computer Science (EECS), GPA
                        4.0
                    </p>
                    <p>
                        <strong>University of California, Berkeley</strong>: 08/2017 - 05/2020{" "}
                        <br />
                        Bachelor of Science, Electrical Engineering and Computer Science (EECS), GPA
                        4.0
                    </p>
                </div>
            ),
        },
        {
            id: "skills",
            title: "Skills",
            contents: (
                <ul>
                    <li>
                        <strong>Programming</strong>: Java, C++, Python, Ruby, JavaScript, Go, C,
                        Rust, HTML/CSS, SQL, Matlab, Scheme, RISC-V
                    </li>
                    <li>
                        <strong>Frameworks</strong>: React, React Native, Django, Unity
                    </li>
                    <li>
                        <strong>Other CS</strong>: Machine Learning, Algorithms, Computer Security,
                        Web/Mobile Development
                    </li>
                    <li>
                        <strong>Languages</strong>: English (native), Mandarin (native)
                    </li>
                </ul>
            ),
        },
        {
            id: "awards",
            title: "Awards",
            contents: (
                <ul>
                    <li>Mark D. Weiser Excellence in Computing Scholarship (2020)</li>
                    <li>
                        Outstanding Team (highest international award),{" "}
                        <em>18th COMAP High School Mathematics Contest in Modeling</em> (2016)
                    </li>
                    <li>
                        National First Prize,
                        <em>
                            30th China Adolescents Science and Technology InnovationContest
                        </em>{" "}
                        (2015)
                    </li>
                    <li>
                        International 66th Place and 7th in northern China,{" "}
                        <em>13th AAPT PhysicsBowl</em> (2014)
                    </li>
                    <li>Chou Pei-Yuan Science and Innovation Award (2015)</li>
                    <li>Soong Ching-ling Invention Award (2015)</li>
                    <li>
                        National First Prize, etc, <em>FIRST Tech Challenge</em> (2014-15)
                    </li>
                </ul>
            ),
        },
        {
            id: "experience",
            title: "Experience",
            contents: (
                <div>
                    <p>
                        <strong>SDE Intern</strong> at Amazon.com Inc, Summer 2020
                        <ul>
                            <li>
                                <strong>Image Gallery View</strong>: Migrated Amazon shopping app
                                immersive product image gallery from obsolete native iOS and Android
                                code to SSNAP (Amazon internal React Native framework), fixing 5
                                bugs and improving user experience, robustness, readability, and
                                maintainability; released changes to beta, with 10,000+ loads in 10
                                regions within a week
                            </li>
                        </ul>
                    </p>
                    <p>
                        <strong>AI Developer Intern</strong> at Stottler Henke Associates Inc,
                        Summer 2019
                        <ul>
                            <li>
                                <strong>MIDAS Automated Resource Scheduler</strong>: Implemented
                                features, fixed bugs, and wrote tests for AFSCN satellite scheduling
                                software in Java (large project with 20+ team members)
                            </li>
                            <li>
                                <strong>Satellite Scheduling Network</strong>:
                                Implemented/experimented with bottleneck scheduling algorithm, added
                                features, GUIs, and visualizations, tested effectiveness and
                                runtime, etc in Java, C++, and Python
                            </li>
                            <li>
                                <strong>Overhead Persistent Infrared</strong>: Investigated a
                                library for features, usage, and dependencies to interface sensors
                            </li>
                        </ul>
                    </p>
                    <p>
                        <strong>Website Developer</strong> for HKN (IEEE honor society), Computing
                        Services, Fall 2018 - Spring 2021
                        <ul>
                            <li>
                                Developed the official website and made it user-friendly and
                                appealing with Django web development
                            </li>
                        </ul>
                    </p>
                    <p>
                        <strong>Research Assistant</strong> in cryptography for UC Berkeley EECS,
                        Spring 2020, advisor Alessandro Chiesa
                        <ul>
                            <li>
                                Developed features in cryptographic libraries for zkSNARKs in C++
                                and Rust
                            </li>
                        </ul>
                    </p>
                    <p>
                        <strong>Research Assistant</strong>, conducted experiments for Department of
                        Architecture at UC Berkeley, Summer and Fall 2018
                        <ul>
                            <li>
                                Created a program with Java so that the data analyzing process was
                                reduced from 3 weeks to 1 day
                            </li>
                            <li>
                                Built and measured the properties of 3D-printed agro-waste materials
                                in flood conditions
                            </li>
                        </ul>
                    </p>
                    <p>
                        <strong>CS Instructor</strong>, part-time job for UC Berkeley Engineering
                        (CS Bootcamp), Summers and Winters 2017-18
                        <ul>
                            <li>
                                Taught online course and created instructional videos, exercises,
                                auto-graders, documents, etc
                            </li>
                        </ul>
                    </p>
                    <p>
                        <strong>Undergraduate Student Instructor</strong>, Discrete Math and
                        Probability Theory (CS 70), UC Berkeley, Fall 2019 and Spring 2020
                        <ul>
                            <li>
                                Taught discussion sections, hosted office hours, proctored/graded
                                exams, contributed to course material, etc
                            </li>
                        </ul>
                    </p>
                </div>
            ),
        },
        {
            id: "projects",
            title: "Projects",
            contents: (
                <div>
                    <p>
                        See my <a href="https://github.com/alexander-zw">GitHub</a> for more.
                    </p>
                    <p>
                        <strong>Guavabots</strong>
                        <br />
                        NP-complete graph problem with greedy algorithms and integer linear
                        programming, Python
                    </p>
                    <p>
                        <strong>Pintos</strong>
                        <br />
                        Operating system file storage with FFS, priority thread scheduling, and
                        process execution, C
                    </p>
                    <p>
                        <strong>Secure File Storage</strong>
                        <br />
                        Cryptographically encrypted and signed file storage and sharing system, Go
                    </p>
                    <p>
                        <strong>The Labyrinth</strong>
                        <br />
                        2D maze game with world generation and game mechanics, Java
                    </p>
                    <p>
                        <strong>BearMaps</strong>
                        <br />
                        Map of Berkeley similar to Google Maps, uses graphs and A* search, Java
                    </p>
                    <p>
                        <strong>Stereo Vision</strong>
                        <br />
                        Detecting depth with two different images, quad tree compression, C and
                        RISC-V
                    </p>
                </div>
            ),
        },
    ];

    const tableOfContents = sections.map((sect, index) => (
        <li className="contents-li" key={index}>
            <a href={`#${sect.id}`} className="contents-item">
                {sect.title}
            </a>
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
            <Helmet>
                <title>Resume | ALEX on Science</title>
                <meta name="Description" content="Alex's resume" />
                <meta
                    name="KeyWords"
                    content="resume, berkeley, experience, alex, alexander, wu, science, youtube"
                />
            </Helmet>

            <nav className="contents-nav text-div">
                <ol className="contents-ol">{tableOfContents}</ol>
            </nav>

            <div className="text-div">
                <span className="name-title">Alexander Wu</span>

                <p>
                    I{"'"}m a current Master{"'"}s student studying Computer Science. I express my
                    love for science through my YouTube channel, among other things. I{"'"}m
                    passionate about education and enjoy doing volunteering work. In my spare time,
                    I read novels, work on personal projects, practice Yoga, and bike around the
                    Bay.
                </p>

                <p>
                    Email: alexwu68 [at] berkeley [dot] edu (see{" "}
                    <Link to="/contact">Contact Me</Link>)
                </p>

                {content}
            </div>
        </div>
    );
}

export default Resume;
