const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AddressSchema = require("./User");

const shopSchema = new Schema({
  shopName: {
    type: String,
    required: true,
  },
  merchantID: {
    type: String,
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  rating: {
    type: Number,
    default: 50,
  },
});

module.exports = Shop = mongoose.model("shop", shopSchema);
