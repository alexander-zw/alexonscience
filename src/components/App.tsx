import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";

import science_banner from "../images/science_banner.jpg";
import Error404 from "./Error404";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { routableViews } from "./subcomponents/AllViews";

/**
 * The main component of the site, including the navigation bar, main content,
 * and footer.
 *
 * TODO:
 * Add blog
 * Fix resume for mobile
 * Mobile friendly nav bar
 * Prerendering
 */

// Scroll to the top of page whenever user switches views.
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    const routesComponent = Object.entries(routableViews).map(([path, route]) => (
        <Route path={path} component={route.component} exact={route.exact} key={path} />
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
                    <Route component={Error404} />
                </Switch>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
