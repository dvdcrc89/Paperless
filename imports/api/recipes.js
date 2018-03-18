import {Mongo} from 'meteor/mongo';
import {Meteor} from "meteor/meteor";
import {RecipeTemps} from "./recipetemps";

export const Recipes = new Mongo.Collection('recipes')


if(Meteor.isServer){
    Meteor.publish('recipe',function (){
        return Recipes.find({userId:this.userId});
    })
}


Meteor.methods({
    'recipes.remove'(item_id){
        if(!this.userId){
            throw new Meteor.Error('not-autorized');
        }
        Recipes.remove({

            userId:this.userId,
            _id: item_id
        })

    },
    'recipes.insert'(begun,recipeName,retailPrice,value,ingredients) {
        Recipes.insert({
            userId:this.userId,
            date: begun,
            recipeName: recipeName,
            retailPrice: retailPrice,
            cost: Math.round(value[value.length - 1] * 100) / 100,
            STitems: ingredients
        })
    }
})