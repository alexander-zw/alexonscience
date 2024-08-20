import Art from "../Art";
import Contact from "../Contact";
import Home from "../Home";
import Projects from "../Projects";
import ExplodeGifCreator from "../projects/ExplodeGifCreator";
import SpacetimeGlobe from "../projects/SpacetimeGlobe";
import Resume from "../Resume";
import type { NavBarURL, OtherRoutableUrl, RoutableURL } from "./AllViewMetadata";

interface Route {
    component: (() => JSX.Element) | (() => null);
    exact: boolean;
}

// Views in the navigation bar.
export const navBarRoutes: Record<NavBarURL, Route> = {
    "/": { component: Home, exact: true },
    "/youtube": {
        component: () => {
            window.location.href = "https://www.youtube.com/channel/UCaV0jdBmPzgBk6AYweICoMA";
            return null;
        },
        exact: false,
    },
    "/resume": { component: Resume, exact: false },
    "/projects": { component: Projects, exact: true },
    "/art": { component: Art, exact: false },
    "/contact": { component: Contact, exact: false },
};

// Views that are not in the navigation bar but valid URLs.
const otherRoutableRoutes: Record<OtherRoutableUrl, Route> = {
    "/projects/spacetimeglobe": { component: SpacetimeGlobe, exact: false },
    "/projects/explodegifcreator": { component: ExplodeGifCreator, exact: false },
};

// Add additional views first so they are seen earlier than their prefixes
// by the router.
export const routes = {
    ...navBarRoutes,
    ...otherRoutableRoutes,
} as Record<RoutableURL, Route>;
