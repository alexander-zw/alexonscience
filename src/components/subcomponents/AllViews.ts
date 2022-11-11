import Art from "../Art";
import Contact from "../Contact";
import Error404 from "../Error404";
import Home from "../Home";
import Projects from "../Projects";
import ExplodeGifCreator from "../projects/ExplodeGifCreator";
import SpacetimeGlobe from "../projects/SpacetimeGlobe";
import Resume from "../Resume";

/**
 * This file contains all meta tags as well as other navigation information for
 * each page. It is used both for prerendering (through prerender.js) and the
 * actual page rendered client side (through MetaTags.tsx, App.tsx, and
 * Navigation.tsx).
 */

interface View {
    name: string;
    component: (() => JSX.Element) | (() => null);
    description: string;
    keywords: string;
    image?: string;
    exact: boolean;
}

// Views in the navigation bar.
export const navigationViews: Record<string, View> = {
    "/": {
        name: "Home",
        component: Home,
        description: "The official ALEX on Science website",
        keywords: "alex, alexander, wu, science, youtube",
        exact: true,
    },
    "/youtube": {
        name: "YouTube",
        component: () => {
            window.location.href = "https://www.youtube.com/channel/UCaV0jdBmPzgBk6AYweICoMA";
            return null;
        },
        description: "ALEX on Science YouTube channel",
        keywords: "alex, science, youtube",
        exact: false,
    },
    "/resume": {
        name: "Resume",
        component: Resume,
        description: "Alex's resume",
        keywords: "resume, berkeley, experience, alexander, wu",
        exact: false,
    },
    "/projects": {
        name: "Projects",
        component: Projects,
        description: "Alex's projects",
        keywords: "project",
        exact: true,
    },
    "/art": {
        name: "Art",
        component: Art,
        description: "Alex's art showcase",
        keywords: "art, sketch, drawing",
        exact: false,
    },
    "/contact": {
        name: "Contact Me",
        component: Contact,
        description: "Contact Alex",
        keywords: "contact, alexander, wu",
        exact: false,
    },
};

// Views that are not in the navigation bar but valid URLs.
const otherRoutableViews: Record<string, View> = {
    "/projects/spacetimeglobe": {
        name: "Spacetime Globe",
        component: SpacetimeGlobe,
        description: "Spacetime globe, visualization of the geometry of special relativity",
        keywords:
            "spacetime, globe, minutephysics, physics, special relativity, " +
            "lorentz transformation",
        image: "/projects/spacetimeglobe/preview.png",
        exact: false,
    },
    "/projects/explodegifcreator": {
        name: "Explode Gif Creator",
        component: ExplodeGifCreator,
        description: "A tool to create exploding gifs",
        keywords: "explode, gif, emoji, tool",
        image: "/projects/explodegifcreator/preview.png",
        exact: false,
    },
};

// Add additional views first so they are seen earlier than their prefixes
// by the router.
export const routableViews = {
    ...navigationViews,
    ...otherRoutableViews,
};

// View that does not have a URL but needs meta tags.
const otherViews: Record<string, View> = {
    "/error": {
        name: "Contact Me",
        component: Error404,
        description: "Error page",
        keywords: "error",
        exact: false,
    },
};

export const allViews = {
    ...routableViews,
    ...otherViews,
};

export function getTitle(view: View) {
    const defaultTitle = "ALEX on Science";
    return view.name == "Home" ? defaultTitle : `${view.name} | ${defaultTitle}`;
}

export function getURL(path: string) {
    const defaultURL = "https://alexonscience.com";
    return path == "/" ? defaultURL : `${defaultURL}${path}`;
}
