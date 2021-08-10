const Joi = require("joi");
const express = require("express");
const { UserSchema } = require("../../models/User");
const Merchant = require("../../models/Merchant");
const Shop = require("../../models/Shop");

const mongoose = require("mongoose");
const router = express.Router();

const getInitialBalance = () => {
  return {
    balance: 0,
    credit: 0,
    debit: 0,
  };
};

// @route   GET /api/merchants/{merchantID}
// @desc    get information of a particular merchant
// @access  Protected
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  Merchant.findById(id, (err, merchant) => {
    if (err) return console.log(`err`, err);
    res.json({ message: "OK", merchant });
  });
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

// @route   POST /api/merchants/addShop
// @desc    add a new shop for merchant
// @access  Protected
router.post("/addShop", async (req, res) => {
  const { merchantID, shopID } = req.body;
  Merchant.findById(merchantID, async (err, merchant) => {
    if (err) return console.log(`err`, err);
    Shop.findById(shopID, async (err, shop) => {
      if (err) return console.log(`err`, err);
      merchant.shopIDList.push(shopID);
      console.log(`merchant`, merchant);
      await merchant.save();
      res.json({ message: "Shop Added for Merchant", merchant });
    });
  });
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
