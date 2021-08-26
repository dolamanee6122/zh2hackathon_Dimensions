const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const config = require("config");

// Balance Schema
const BalanceSchema = new Schema(
  {
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
  },
  { _id: false }
);

//Create Schema
const UserSchema = new Schema(
  {
    fusionID: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    accountType: {
      type: String,
      required: true,
      enum: ["buyer", "merchant"],
    },
    balance: {
      type: BalanceSchema,
      required: true,
    },
  },
  { _id: false }
);

//hash the password
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

//generate token
UserSchema.methods.generateAuthToken = async function (id) {
  try {
    const token = jwt.sign({ _id: id }, config.get("jwtSecret"), {
      expiresIn: 3600,
    });
    //this.tokens = this.tokens.concat({ token });
    return token;
  } catch (err) {
    console.log(`err`, err);
  }
};

module.exports = {
  BalanceSchema,
  UserSchema,
};
