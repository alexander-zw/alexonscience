/**
 * This file contains all meta tags as well as other navigation information for
 * each page. It is used both for prerendering (through prerender.js) and the
 * actual page rendered client side (through MetaTags.js, App.js, and
 * Navigation.js).
 */
import Home from "../Home";
import Resume from "../Resume";
import Art from "../Art";
import Contact from "../Contact";
import Projects from "../Projects";
import SpacetimeGlobe from "../projects/SpacetimeGlobe";
import Error from "../Error";

// Views in the navigation bar.
export const navigationViews = new Map([
    [
        "/",
        {
            name: "Home",
            component: Home,
            description: "The official ALEX on Science website",
            keywords: "alex, alexander, wu, science, youtube",
            exact: true,
        },
    ],
    [
        "/youtube",
        {
            name: "YouTube",
            component: () => {
                window.location.href = "https://www.youtube.com/channel/UCaV0jdBmPzgBk6AYweICoMA";
                return null;
            },
            description: "ALEX on Science YouTube channel",
            keywords: "alex, science, youtube",
            exact: undefined,
        },
    ],
    [
        "/resume",
        {
            name: "Resume",
            component: Resume,
            description: "Alex's resume",
            keywords: "resume, berkeley, experience, alexander, wu",
            exact: undefined,
        },
    ],
    [
        "/projects",
        {
            name: "Projects",
            component: Projects,
            description: "Alex's projects",
            keywords: "project",
            exact: undefined,
        },
    ],
    [
        "/art",
        {
            name: "Art",
            component: Art,
            description: "Alex's art showcase",
            keywords: "art, sketch, drawing",
            exact: undefined,
        },
    ],
    [
        "/contact",
        {
            name: "Contact Me",
            component: Contact,
            description: "Contact Alex",
            keywords: "contact, alexander, wu",
            exact: undefined,
        },
    ],
]);

// Views that are not in the navigation bar but valid URLs.
const otherRoutableViews = [
    [
        "/projects/spacetimeglobe",
        {
            name: "Spacetime Globe",
            component: SpacetimeGlobe,
            description: "Spacetime globe, visualization of the geometry of special relativity",
            keywords:
                "spacetime, globe, minutephysics, physics, special relativity, " +
                "lorentz transformation",
            exact: undefined,
        },
    ],
];

// Add additional views first so they are seen earlier than their prefixes
// by the router.
export const routableViews = new Map(otherRoutableViews.concat([...navigationViews]));

// View that does not have a URL but needs meta tags.
const otherViews = [
    [
        "/error",
        {
            name: "Contact Me",
            component: Error,
            description: "Error page",
            keywords: "error",
            exact: undefined,
        },
    ],
];

export const allViews = new Map(otherViews.concat([...routableViews]));

export function getTitle(view) {
    const defaultTitle = "ALEX on Science";
    return view.name == "Home" ? defaultTitle : `${view.name} | ${defaultTitle}`;
}

export function getURL(path) {
    const defaultURL = "https://alexonscience.com";
    return path == "/" ? defaultURL : `${defaultURL}${path}`;
}
