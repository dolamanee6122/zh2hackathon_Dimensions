const Joi = require("joi");
const express = require("express");
const router = express.Router();
const Merchant = require("../../models/Merchant");
const Shop = require("../../models/Shop");

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
