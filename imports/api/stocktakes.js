import {Mongo} from 'meteor/mongo';
import {Meteor} from "meteor/meteor";
import {Recipes} from "./recipes";

export const StockTakes = new Mongo.Collection('stocktakes');



if(Meteor.isServer){
    Meteor.publish('stocktakes',function (){
        return StockTakes.find({User:this.userId});
    })
}


Meteor.methods({

    "stocktakes.insert"(begun, notes, value, stocktake) {
        StockTakes.insert({
            User: Meteor.userId(),
            Date: begun,
            Note: notes,
            TotalValue: Math.round(value[value.length - 1] * 100) / 100,
            STitems: stocktake


        })
    },
    "stockTakes.remove"(id){
        StockTakes.remove({_id:id});
    }
})