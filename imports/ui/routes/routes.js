import {Meteor} from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import LoginSignup from "../startingPages/login_signup";
import {Router, Switch, Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import Profile from './../profile/profile'
import StockMain from './../stock/stockMain'
import StockTakes from '../stocktakes/stocktake'
import FridgeFreezer from './../paperworks/fridgeFreezer'
import NotFound from './../generic/notFound'
import StocktakesList from './../stocktakes/stocktakesList'
import Recipe from './../menuCosting/recipe'
import RecipeList from './../menuCosting/recipeList'

export const history = createHistory();

//Define pages that can be visit from Unauthenticated users only
const unauthenticatedPages = ['/'];
//Define pages that can be visit from Authenticated users only
const authenticatedPages = ['/profile','/stock','/stocktakes','/fftemperature','/stocktakeslist'];


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
            <Route exact path="/" component={LoginSignup}/>


            <Route exact path="/profile" component={Profile}/>

            <Route exact path="/stock" component={StockMain}/>

            <Route exact path="/stocktakes" component={StockTakes}/>

            <Route exact path="/stocktakeslist" component={StocktakesList}/>

            <Route exact path="/fftemperature" component={FridgeFreezer}/>

            <Route exact path="/recipe" component={Recipe}/>

            <Route exact path="/recipelist" component={RecipeList}/>




            <Route component={NotFound}/>
        </Switch>
    </Router>
);