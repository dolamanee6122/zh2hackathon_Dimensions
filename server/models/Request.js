const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { BalanceSchema } = require("./User");

// Request Schema
const RequestSchema = new Schema({
  buyer: {
    buyerID: {
      type: Schema.Types.ObjectId,
      ref: "buyer",
      required: true,
    },
    buyerName: String,
    rating: Number,
    address: String,
  },
  shop: {
    shopID: {
      type: Schema.Types.ObjectId,
      ref: "shop",
      required: true,
    },
    shopName: String,
  },
  merchant:{
    merchantID: {
      type: Schema.Types.ObjectId,
      ref: "merchant",
      required: true,
    },
    merchantName: String,
    rating: Number,
    address: String,
  },
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED", "FAILED"],
    default: "PENDING",
  },
  amount: {
    type: Number,
    required: true,
  },
  recordType: {
    type: String,
    enum: ["DEBIT", "CREDIT"],
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
  remarks: String,
  balanceShopWise: BalanceSchema,
});

module.exports = Request = mongoose.model("request", RequestSchema);
