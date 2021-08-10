const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { UserSchema } = require("./User");

//Create Schema
const MerchantSchema = new Schema(
  {
    user: {
      type: UserSchema,
      required: true,
    },
    shopList: [
      {
        shopID: {
          type: Schema.Types.ObjectId,
          ref: "shop",
        },
        shopName: String,
      },
    ],
    //TODO: Add Last5 Transaction
    //TODO: Add Last3 Request
  },
  { timestamps: true }
);

module.exports = Merchant = mongoose.model("merchant", MerchantSchema);
