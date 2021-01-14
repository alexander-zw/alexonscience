import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Art from './Art';
import Error from './Error';
import Navigation from './Navigation';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Navigation />
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/art" component={Art}/>
                    <Route component={Error}/>
                </Switch>
            </div> 
        </BrowserRouter>
    );
  }
}

export default App;