/**
 * The main component of the site, including the navigation bar, main content,
 * and footer.
 *
 * TODO:
 * Improve resume (add picture)
 * Add blog
 * Fix resume for mobile
 * Mobile friendly nav bar
 * Prerendering
 */
import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Error from "./Error";
import Navigation, { navigationViews } from "./Navigation";
import Footer from "./Footer";
import SpacetimeGlobe from "./projects/SpacetimeGlobe";
import science_banner from "../images/science_banner.jpg";

// Scroll to the top of page whenever user switches views.
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    // Add views that are not in the navigation bar but valid URLs.
    // Add additional views first so they are seen earlier than their prefixes.
    const allViews = [
        {
            path: "/projects/spacetimeglobe",
            component: SpacetimeGlobe,
            exact: undefined,
        },
    ].concat(navigationViews);

    const routesComponent = allViews.map((route, index) => (
        <Route path={route.path} component={route.component} exact={route.exact} key={index} />
    ));

    return (
        <BrowserRouter>
            <ScrollToTop />
            <div className="non-footer-content">
                <div>
                    <img id="science-banner-image" src={science_banner} alt="ALEX on Science" />
                </div>
                <Navigation />
                <Switch>
                    {routesComponent}
                    <Route component={Error} />
                </Switch>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
