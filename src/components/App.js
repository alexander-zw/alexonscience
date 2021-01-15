/**
 * The main component of the site, including the navigation bar, main content,
 * and footer.
 */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Art from './Art';
import Error from './Error';
import Navigation from './Navigation';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="non-footer-content">
                <Navigation />
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/art" component={Art}/>
                    <Route path='/youtube' component={() => {
                        window.location.href = 'https://www.youtube.com/channel/UCaV0jdBmPzgBk6AYweICoMA';
                        return null;
                    }}/>
                    <Route component={Error}/>
                </Switch>
            </div>
            <Footer />
        </BrowserRouter>
    );
  }
}

export default App;