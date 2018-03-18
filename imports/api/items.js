import {Mongo} from 'meteor/mongo';
import {Meteor} from "meteor/meteor";

export const Items = new Mongo.Collection('items');

if(Meteor.isServer){
    Meteor.publish('items',function (){
        return Items.find({userId:this.userId});
    })
}


Meteor.methods({
    'items.remove'(item_id){
        if(!this.userId){
            throw new Meteor.Error('not-autorized');
        }
        Items.remove({

            userId:this.userId,
            _id: item_id
        })

    },
    'items.insert'(itemName,itemDescription,itemQuantity,itemPrice,itemUnitMeasure) {
        if(Items.find({itemName}).fetch().length>0){
            throw new Meteor.Error('Element already in');
        }
        Items.insert({
            userId: this.userId,
            itemName: itemName,
            itemDescription: itemDescription,
            itemQuantity: itemQuantity,
            itemPrice: itemPrice,
            itemUnitMeasure: itemUnitMeasure


        })
    }
})