/**
 * The main component of the site, including the navigation bar, main content,
 * and footer.
 *
 * TODO:
 * Improve mobile layout
 * Add portfolio
 * Add projects
 * Improve homepage
 * Add blog
 */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Portfolio from './Portfolio';
import Art from './Art';
import Contact from './Contact';
import Error from './Error';
import Navigation from './Navigation';
import Footer from './Footer';

function App() {
    return (
        <BrowserRouter>
            <div className="non-footer-content">
                <Navigation />
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/portfolio" component={Portfolio}/>
                    <Route path="/art" component={Art}/>
                    <Route path="/youtube" component={() => {
                        window.location.href = 'https://www.youtube.com/channel/UCaV0jdBmPzgBk6AYweICoMA';
                        return null;
                    }}/>
                    <Route path="/contact" component={Contact}/>
                    <Route component={Error}/>
                </Switch>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;