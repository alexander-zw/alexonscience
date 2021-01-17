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
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Error from './Error';
import Navigation, { navigationViews } from './Navigation';
import Footer from './Footer';

function App() {
    const routesComponent = navigationViews.map((route, index) => (
        <Route path={route.path} component={route.component} exact={route.exact} key={index}/>
    ));

    return (
        <BrowserRouter>
            <div className="non-footer-content">
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