const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Attribute Schema
const AttributeSchema = new Schema({
  referenceTransactionID: {
    type: String,
    required: true,
  },
});

//Create Schema
const TransactionSchema = new Schema(
  {
    buyerID: {
      type: Schema.Types.ObjectId,
      ref: "buyers",
      required: true,
    },
    buyerName: String,
    shopID: {
      type: Schema.Types.ObjectId,
      ref: "shops",
      required: true,
    },
    shopName:String,
    merchantID: {
      type: Schema.Types.ObjectId,
      ref: "merchants",
      required: true,
    },
    merchantName:String,
    previousBalance: {
      type: Number,
      required: true,
    },
    newBalance: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    recordType: {
      type: String,
      enum: ["CREDIT", "DEBIT"],
      required: true,
    },
    remarks: {
      type: String,
    },
    paymentMode: {
      type: String,
      required: true,
    },
    attributes: {
      type: AttributeSchema,
    },
  },
  { timestamps: true }
);

module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
