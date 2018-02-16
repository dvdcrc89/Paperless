import React from 'react'
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor'
import {Tracker} from 'meteor/tracker'
import {Items} from "./../imports/api/items";
import App from '../imports/ui/stock/App'

Meteor.startup( ()=> {
    Tracker.autorun(()=>{
        let items = Items.find().fetch();
        ReactDOM.render(<App items={items}/>,document.getElementById('app'));

    });

});

