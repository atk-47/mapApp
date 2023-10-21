import React, { Component } from "react";
import { Router,  Route } from "react-router-dom";

import App from "./App";
import Home from "./Home";


export default class Routes extends Component {
    render() {
        return (
            <Router>
                    <Route path="/Home" exact component={Home} />
                    <Route path="/App" component={App} />
            </Router>
        )
    }
}