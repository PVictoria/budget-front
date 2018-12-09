import React from "react";
import Login from "./Login";
import {Switch, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css"
import Navigation from "./Navigation";
import Greeting from "./Greeting";

const App = () => (
    <Switch>
        <Route exact path='/login' component={Login}/>
        <Route path='/navigation' component={Navigation}/>
        <Route path='/greeting' component={Greeting}/>
    </Switch>
);


export default App