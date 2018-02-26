import {Meteor} from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import Signup from "../startingPages/signup";
import Login from "../startingPages/login";
import {Router, Switch, Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import Profile from './../profile/profile'
import StockMain from './../stock/stockMain'
import StockTakes from './../stocktakes/stocktakes'

export const history = createHistory();

//Define pages that can be visit from Unauthenticated users only
const unauthenticatedPages = ['/', '/signgup', '/login'];
//Define pages that can be visit from Authenticated users only
const authenticatedPages = ['/profile','/stock','stocktakes'];


export const onAuthChange = () => {
    const pathname = history.location.pathname.toLowerCase();
    const isAuthenticated = !!Meteor.userId();
    const isUnauthenticatedPages = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPages = authenticatedPages.includes(pathname);

    if (!(isAuthenticated) && isAuthenticatedPages) {
        history.replace("/");
    } else if (isAuthenticated && isUnauthenticatedPages) {
        history.replace("/profile");
    }

}

export const AppRouter = () => (

    <Router history={history}>
        <Switch>
            <Route exact path="/" component={Login}/>

            <Route exact path="/signup" component={Signup}/>

            <Route exact path="/profile" component={Profile}/>

            <Route exact path="/stock" component={StockMain}/>

            <Route exact path="/stocktakes" component={StockTakes}/>



            {/*<Route component={NotFound}/>*/}
        </Switch>
    </Router>
);