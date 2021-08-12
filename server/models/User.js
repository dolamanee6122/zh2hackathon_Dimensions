const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const config = require("config");
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
    salutation: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      // required: true,
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
    },
    profilePicURL: {
      type: String,
    },
    mobileNo: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: AddressSchema,
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
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
  AddressSchema,
  BalanceSchema,
  UserSchema,
};
