/**
 * This file contains all meta tags as well as other navigation information for
 * each page. It is used both for prerendering (through prerender.js) and the
 * actual page rendered client side (through MetaTags.tsx, App.tsx, and
 * Navigation.tsx).
 */

export interface ViewMeta {
    name: string;
    description: string;
    keywords: string;
    image?: string;
}

export type NavBarURL = "/" | "/youtube" | "/resume" | "/projects" | "/art" | "/contact";
export type OtherRoutableUrl = "/projects/spacetimeglobe" | "/projects/explodegifcreator";
type NonRoutableUrl = "/error";
export type RoutableURL = NavBarURL | OtherRoutableUrl;
export type AnyURL = RoutableURL | NonRoutableUrl;

// Views in the navigation bar.
export const navigationViewMeta: Record<NavBarURL, ViewMeta> = {
    "/": {
        name: "Home",
        description: "The official ALEX on Science website",
        keywords: "alex, alexander, wu, science, youtube",
    },
    "/youtube": {
        name: "YouTube",
        description: "ALEX on Science YouTube channel",
        keywords: "alex, science, youtube",
    },
    "/resume": {
        name: "Resume",
        description: "Alex's resume",
        keywords: "resume, berkeley, experience, alexander, wu",
    },
    "/projects": {
        name: "Projects",
        description: "Alex's projects",
        keywords: "project",
    },
    "/art": {
        name: "Art",
        description: "Alex's art showcase",
        keywords: "art, sketch, drawing",
    },
    "/contact": {
        name: "Contact Me",
        description: "Contact Alex",
        keywords: "contact, alexander, wu",
    },
};

// Views that are not in the navigation bar but valid URLs.
const otherRoutableViewMeta: Partial<Record<OtherRoutableUrl, ViewMeta>> = {
    "/projects/spacetimeglobe": {
        name: "Spacetime Globe",
        description: "Spacetime globe, visualization of the geometry of special relativity",
        keywords:
            "spacetime, globe, minutephysics, physics, special relativity, " +
            "lorentz transformation",
        image: "/projects/spacetimeglobe/preview.png",
    },
    "/projects/explodegifcreator": {
        name: "Explode Gif Creator",
        description: "A tool to create exploding gifs",
        keywords: "explode, gif, emoji, tool",
        image: "/projects/explodegifcreator/preview.png",
    },
};

// Add additional views first so they are seen earlier than their prefixes
// by the router.
const routableViewMeta = {
    ...navigationViewMeta,
    ...otherRoutableViewMeta,
} as Record<RoutableURL, ViewMeta>;

// View that does not have a URL but needs meta tags.
const otherViewMeta: Record<string, ViewMeta> = {
    "/error": {
        name: "Contact Me",
        description: "Error page",
        keywords: "error",
    },
};

export const allViewMeta = {
    ...routableViewMeta,
    ...otherViewMeta,
} as Record<AnyURL, ViewMeta>;

export function getTitle(view: ViewMeta) {
    const defaultTitle = "ALEX on Science";
    return view.name == "Home" ? defaultTitle : `${view.name} | ${defaultTitle}`;
}

export function getURL(path: string) {
    const defaultURL = "https://alexonscience.com";
    return path == "/" ? defaultURL : `${defaultURL}${path}`;
}
