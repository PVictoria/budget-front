import React from "react";
import Login from "./Login";
import {Route, Switch} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css"
import Navigation from "./Navigation";
import Greeting from "./Greeting";
import MyTable from "./MyTable";
import CreateArticle from "./CreateArticle";

const App = () => (
    <Switch>
        <Route exact path='/login' component={Login}/>
        <Route path='/navigation' component={Navigation}/>
        <Route path='/greeting' component={Greeting}/>
        <Route path='/articles' component={MyTable}/>
        <Route path='/create-article' component={CreateArticle}/>
    </Switch>
);


export default App