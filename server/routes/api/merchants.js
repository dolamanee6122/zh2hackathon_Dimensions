const Joi = require("joi");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const Merchant = require("../../models/Merchant");
const Shop = require("../../models/Shop");
const Transaction = require("../../models/Transaction");
const auth = require("../../middleware/auth");
const getInitialBalance = () => {
  return {
    balance: 0,
    credit: 0,
    debit: 0,
  };
};

// @route   POST /api/merchants
// @desc    register a new merchants
// @access  Public
router.post("/", async (req, res) => {
  const { user } = req.body;
  user.balance = getInitialBalance();
  try {
    //TODO check if the emailID/mobileNo already exist
    const merchant = new Merchant({ user });
    await merchant.save();
    res.json({ message: "Merchant Added", merchant });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

//const get

// @route   GET /api/merchants/{merchantID}
// @desc    get information of a particular merchant
// @access  Protected
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const merchant = await Merchant.findById(id);
    if (!merchant)
      return res.status(404).json({ message: "Invalid merchantID" });

    res.json({ message: "OK", merchant });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
  }
});

// @route   POST /api/merchants/signin
// @desc    login for merchant
// @access  public
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const merchantLogin = await Merchant.findOne({ "user.email": email });
    if (
      !merchantLogin ||
      !(await bcrypt.compare(password, merchantLogin.user.password))
    )
      return res.status(404).json({ message: "Invalid credentials" });
    const token = await merchantLogin.user.generateAuthToken(merchantLogin._id);
    // merchantLogin.save();
    // res.cookie("jwtoken", token, {
    //   expires: new Date(Date.now() + 2589200000),
    //   httpOnly: true,
    // });
    res.json({ message: "Signed In successfully", token, merchantLogin });
  } catch (err) {
    console.log(`err`, err);
    res.status(500).json({ err });
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
