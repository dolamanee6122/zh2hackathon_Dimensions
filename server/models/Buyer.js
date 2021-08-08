const mongoose = require("mongoose");
const Transaction = require("./Transaction");
const Schema = mongoose.Schema;

//Create Schema
const BuyerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  transaction: {
    type: Transaction,
    required: true,
  },
});

module.exports = Item = mongoose.model("item", ItemSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id : {
        type: String,
        required: true,
        unique: true,
    },
    username : {
        type: String,
        required: true,
        unique: true,
    },
    firstname : {
        type: String,
        required: true,
    },
    lastname : {
        type: String,
    }, 
    gender : {
        type: String,
        required: true,
    }, 
    dob : {
    	type : Date,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    phone : {
        type: String,
        required: true,
        unique: true,
    },
   // because only id is needed whole model need not be used
    transactions : [{
    	type: mongoose.Schema.Types.ObjectId,
		ref:"Transaction"	
	}],
    contacts : [{
    	type: mongoose.Schema.Types.ObjectId,
		ref:"Shop"
    }], // contain shopids
//Transactions : [ transaction ] //last 5 
//Contacts :  [Shops]  //only visible to user

//additional :
	address : {
		line1: String,
		line2: String,
		city: String,
		state : String,
		pin : Number,
	}
	kyc :{
    	type : String,
    	expiry : Date,

	},
}, {
    timestamps : true,
});

const User = mongoose.model('User',userSchema);

module.exports = User; 
