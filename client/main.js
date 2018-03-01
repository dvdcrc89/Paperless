import React from 'react'
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor'
import {Tracker} from 'meteor/tracker'
import {Items} from "./../imports/api/items";
import {Temps} from "./../imports/api/temps";
import {Recipes} from "./../imports/api/recipes";
import {RecipeTemps} from "./../imports/api/recipetemps";

import StockMain from '../imports/ui/stock/stockMain'
import StockTakes from '../imports/ui/stocktakes/stocktake'
import FridgeFreezer from './../imports/ui/paperworks/fridgeFreezer'
import {AppRouter,onAuthChange} from './../imports/ui/routes/routes'





Meteor.startup(()=> {
    Tracker.autorun(()=> {
    onAuthChange();
        const data = Items.find({User: Meteor.userId()}).fetch()
        const temps = Temps.find({User: Meteor.userId()}).fetch()
        const recipetemps = RecipeTemps.find({User: Meteor.userId()}).fetch()
        const recipe = Recipes.find({User: Meteor.userId()}).fetch();
        ReactDOM.render(<AppRouter/>,document.getElementById("app"));
})
});
