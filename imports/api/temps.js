import {Mongo} from 'meteor/mongo';
import {Meteor} from "meteor/meteor";
export const Temps = new Mongo.Collection('temps');




if(Meteor.isServer){
    Meteor.publish('temps',function (){
        return Temps.find({userId:this.userId});
    })
}


Meteor.methods({
    'temps.remove'(item_id){
        if(!this.userId){
            throw new Meteor.Error('not-autorized');
        }
        Temps.remove({

            userId:this.userId,
            _id: item_id
        })

    },
    'temps.insert'(itemName,itemQuantity,measure,itemId,value) {

        Temps.insert({
            userId: Meteor.userId(),
            itemName: itemName,
            itemQuantity: itemQuantity,
            itemMeasure: measure,
            ingredientId: itemId,
            itemValue: Math.round(value * 100) / 100


        })
    },
    'temps.drop'(){
        Temps.find({userId: Meteor.userId}).fetch().map((temp) => {
            Temps.remove({_id: temp._id})
        })
    }
})