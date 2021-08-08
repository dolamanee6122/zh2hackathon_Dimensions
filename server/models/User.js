const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const AddressSchema = new Schema({
  line1: String,
  line2: String,
  city: String,
  state: String,
  pinCode: { type: Number, required: true },
});
//Create Schema
const UserSchema = new Schema({
  salutation: {
    type: String,
    required: true,
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
    required: true,
  },
  gender: {
    type: String,
    //enum: ["Male", "Female"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Number,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
    //enum: ["buyer", "merchant"],
  },
  //   shopIDList: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       reference: "Shop",
  //     },
  //   ],
});

//hash the password
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

module.exports.User = User = mongoose.model("user", UserSchema);
module.exports.AddressSchema = AddressSchema;
module.exports.UserSchema = UserSchema;
