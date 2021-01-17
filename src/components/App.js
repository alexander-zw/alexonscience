/**
 * The main component of the site, including the navigation bar, main content,
 * and footer.
 *
 * TODO:
 * Add portfolio
 * Add projects
 * Improve homepage
 * Add blog
 */
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useLocation } from "react-router-dom";

import Error from './Error';
import Navigation, { navigationViews } from './Navigation';
import Footer from './Footer';
import science_banner from '../images/science_banner.jpg';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    const routesComponent = navigationViews.map((route, index) => (
        <Route path={route.path} component={route.component} exact={route.exact} key={index}/>
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
                    <Route component={Error}/>
                </Switch>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;