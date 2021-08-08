const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Attribute Schema
const AttributeSchema = new Schema({
  referenceTransactionID: {
    type: String,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
});

//Create Schema
const TransactionSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "buyers",
    required: true,
  },
  shopID: {
    type: Schema.Types.ObjectId,
    ref: "shops",
    required: true,
  },
  previousBalance: {
    type: Number,
    required: true,
  },
  newBalance: {
    type: Number,
    required: true,
  },
  timestamp: {
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
  attributes: {
    type: AttributeSchema,
    required: true,
  },
});

module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
