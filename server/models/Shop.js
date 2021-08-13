const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AddressSchema = require("./User");

// Balance Schema
const BalanceSchema = new Schema({
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  credit: {
    type: Number,
    required: true,
    default: 0,
  },
  debit: {
    type: Number,
    required: true,
    default: 0,
  },
});

const shopSchema = new Schema(
  {
    shopName: {
      type: String,
      required: true,
      unique: true,
    },
    merchantID: {
      type: String,
      required: true,
    },
    merchantName: {
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
    balance: {
      type: BalanceSchema,
      required: true,
    },
    balanceUserWise: [
      {
        buyerID: {
          type: Schema.Types.ObjectId,
          ref: "buyer",
          required: true,
        },
        buyerName: String,
        balance: BalanceSchema,
      },
    ],
    requestList: [],
  },
  { timestamps: true }
);

module.exports = Shop = mongoose.model("shop", shopSchema);
