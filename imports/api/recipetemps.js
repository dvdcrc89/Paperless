import {Mongo} from 'meteor/mongo';
import {Meteor} from "meteor/meteor";
import {Items} from "./items";

export const RecipeTemps = new Mongo.Collection('recipetemps');


if(Meteor.isServer){
    Meteor.publish('recipeTemps',function (){
        return RecipeTemps.find({userId:this.userId});
    })
}


Meteor.methods({
    'recipeTemps.remove'(item_id){
        if(!this.userId){
            throw new Meteor.Error('not-autorized');
        }
        RecipeTemps.remove({

            userId:this.userId,
            _id: item_id
        })

    },
    'recipeTemps.insert'(itemName,itemQuantity,itemMeasureUnit,itemId,value) {

        RecipeTemps.insert({
            userId: this.userId,
            itemName: itemName,
            itemQuantity: itemQuantity,
            itemMeasure: itemMeasureUnit,
            ingredientId: itemId,
            itemValue: Math.round(value * 100) / 100


        })
    },
    'recipeTemps.drop'(){
        RecipeTemps.find({userId: Meteor.userId}).fetch().map((temp) => {
            RecipeTemps.remove({_id: temp._id})
        })
    }
})