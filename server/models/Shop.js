const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { BalanceSchema } = require("./User");

// Address Schema
const AddressSchema = new Schema(
  {
    line1: String,
    line2: String,
    city: String,
    state: String,
    pinCode: { type: Number, required: true },
  },
  { _id: false }
);

const shopSchema = new Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    merchantID: {
      type: String,
      required: true,
    },
    merchantName: {
      type: String,
      required: true,
    },
    accountID: {
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
