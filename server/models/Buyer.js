const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { UserSchema, BalanceSchema } = require("./User");

//Create Schema
const BuyerSchema = new Schema(
  {
    user: {
      type: UserSchema,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 50,
    },
    balanceShopWise: [
      {
        shopID: {
          type: Schema.Types.ObjectId,
          ref: "shop",
          required: true,
        },
        shopName: String,
        balance: BalanceSchema,
      },
    ],
  },
  { timestamps: true }
);

module.exports = Buyer = mongoose.model("buyer", BuyerSchema);
