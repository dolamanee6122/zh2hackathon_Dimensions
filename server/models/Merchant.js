const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

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

//generate token
MerchantSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id },
      require("../config/keys").SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token });
    //await this.save();
    return token;
  } catch (err) {
    console.log(`err`, err);
  }
};
module.exports = Merchant = mongoose.model("merchant", MerchantSchema);
