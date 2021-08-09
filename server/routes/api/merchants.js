const Joi = require("joi");
const express = require("express");
const UserSchema = require("../../models/User");
const Merchant = require("../../models/Merchant");
const mongoose = require("mongoose");
const router = express.Router();

//Merchant model
//const Merchant = require("../../models/Merchant");
const merchants = [
  { id: 1, name: "merchant1" },
  { id: 2, name: "merchant2" },
  { id: 3, name: "merchant3" },
  { id: 4, name: "merchant4" },
];

const getInitialBalance = () => {
  return {
    balance: 0,
    credit: 0,
    debit: 0,
  };
};

router.get("/", (req, res) => {
  res.send(merchants);
});

router.get("/:id", (req, res) => {
  const merchant = merchants.find((m) => m.id === parseInt(req.params.id));
  if (!merchant)
    return res.status(404).send("Given merchant ID does not exist");
  res.send(merchant);
});

// @route   POST /api/merchants
// @desc    register a new merchants
// @access  Public
router.post("/", async (req, res) => {
  const { user } = req.body;
  user.balance = getInitialBalance();
  try {
    const merchant = new Merchant({ user });
    console.log(`merchant`, merchant);
    await merchant.save();
    res.json({ message: "Merchant Added", merchant });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", (req, res) => {
  const merchant = merchants.find((m) => m.id === parseInt(req.params.id));
  if (!merchant)
    return res.status(404).send("Given merchant ID does not exist");

  const { error } = validateMerchant(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  merchant.name = req.body.name;
  res.send(merchant);
});

router.delete("/:id", (req, res) => {
  const merchant = merchants.find((m) => m.id === parseInt(req.params.id));
  if (!merchant)
    return res.status(404).send("Given merchant ID does not exist");

  const index = merchants.indexOf(merchant);
  merchants.splice(index, 1);
  res.send(merchant);
});

validateMerchant = (merchant) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(merchant);
};

module.exports = router;
