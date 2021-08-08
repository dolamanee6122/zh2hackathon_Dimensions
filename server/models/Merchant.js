const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = require("./User");
//Create Schema
const MerchantSchema = new Schema({
  user: {
    type: userSchema,
    required: true,
  },
  shopIDList: [
    {
      type: Schema.Types.ObjectId,
      ref: "shop",
    },
  ],
});

module.exports = Merchant = mongoose.model("merchant", MerchantSchema);

/*const merchantSchema = new Schema({

   // because only id is needed whole model need not be used
    transactions : [{
    	type: mongoose.Schema.Types.ObjectId,
		ref:"Transaction"	
	}],
//Transactions : [ transaction ] //last 5 
//Contacts :  [Shops]  //only visible to user

});
*/
